import { useTripsFacade } from '@/features/trips';
import { useAuthFacade } from '@/features/users';
import { Locate } from '@tamagui/lucide-icons';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { LatLng, Marker, Polygon } from 'react-native-maps';
import { Button, Circle, Text, View } from 'tamagui';
import * as Location from 'expo-location';
import { Trip } from '@/features/trips/types';
import { Point } from '@/features/points/types';
import { Alert } from 'react-native';
import { TripsMapPageProps } from './trips-map-page-props';

type Bounds = {
  northEast: {
    latitude: number;
    longitude: number;
  };
  southWest: {
    latitude: number;
    longitude: number;
  };
};

export interface TripMap {
  id: Trip['id'];
  name: Trip['name'];
  points: {
    id: Point['id'];
    latitude: Point['latitude'];
    longitude: Point['longitude'];
  }[];
}

export const TripsMap = ({ navigation }: TripsMapPageProps) => {
  const { fetchTripsInBounds } = useTripsFacade();
  const { accessToken } = useAuthFacade();
  const mapRef = useRef<MapView>(null);
  const [trips, setTrips] = useState<TripMap[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    })();
  }, []);

  const getMapBoundaries = async (): Promise<Bounds | undefined> => {
    if (mapRef && mapRef.current) {
      const mapBoundaries = (await mapRef.current.getMapBoundaries()) as Bounds;
      return mapBoundaries;
    }
  };

  const handleMapRegionChange = async () => {
    const boundaries = await getMapBoundaries();

    if (boundaries) {
      fetchTripsInBounds(boundaries, accessToken).then(data => {
        setTrips(data);
      });
    }
  };

  /* const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }; */

  /* const deg2rad = deg => {
    return deg * (Math.PI / 180);
  }; */

  /* const getProcessedCoordinates = (trip: TripMap) => {
    const coords = getCoordinates(trip);

    const sortedCoords = coords.sort((a, b) => {
      return (
        getDistanceFromLatLonInKm(
          coords[0].latitude,
          coords[0].longitude,
          a.latitude,
          a.longitude,
        ) -
        getDistanceFromLatLonInKm(
          coords[0].latitude,
          coords[0].longitude,
          b.latitude,
          b.longitude,
        )
      );
    });
    return sortedCoords;
  }; */

  const getCoordinates = (
    trip: TripMap,
  ): {
    latitude: Point['latitude'];
    longitude: Point['longitude'];
  }[] => {
    return trip.points.map(point => {
      return {
        latitude: point.latitude,
        longitude: point.longitude,
      };
    });
  };

  const goToMyLocation = async () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      mapRef.current.animateCamera({
        center: {
          ...location.coords,
        },
        altitude: 500,
      });
    })();
  };

  const goToTripDetails = (tripName: Trip['name'], tripId: Trip['id']) => {
    Alert.alert(tripName, 'Перейти к деталям выезда?', [
      {
        text: 'Да',
        onPress: () => {
          navigation.navigate('trip-details', {
            title: tripName,
            tripId: tripId,
          });
        },
      },
      {
        text: 'Нет',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View>
      <MapView
        showsCompass={false}
        ref={mapRef}
        onMapReady={handleMapRegionChange}
        style={{ width: '100%', height: '100%' }}
        onRegionChangeComplete={handleMapRegionChange}>
        {trips.map(trip => {
          return (
            <React.Fragment key={trip.id}>
              <Polygon
                onPress={() => goToTripDetails(trip.name, trip.id)}
                coordinates={getCoordinates(trip) as LatLng[]}
                strokeWidth={3}
              />
              {getCoordinates(trip).map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={coordinate as LatLng}>
                  <Circle
                    backgrounded
                    shadowRadius={'$1.5'}
                    shadowOpacity={0.5}
                    size={30}>
                    <Text>{index + 1}</Text>
                  </Circle>
                </Marker>
              ))}
            </React.Fragment>
          );
        })}
      </MapView>
      {mapRef && (
        <Button
          bordered
          position="absolute"
          bottom={'$3'}
          right={'$3'}
          alignSelf="flex-end"
          icon={Locate}
          p={'$3'}
          circular
          theme={'blue_active'}
          shadowRadius={'$1.5'}
          shadowOpacity={0.5}
          onPress={goToMyLocation}
        />
      )}
    </View>
  );
};
