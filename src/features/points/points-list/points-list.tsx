import { TripDatesCalendar } from '@/features/trips';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Circle,
  H5,
  Text,
  View,
  XStack,
  YStack,
  getTokens,
  useTheme,
} from 'tamagui';
import { PointsListProps } from './types';
import { deletePoint, fetchTripPoints, updatePointDetails } from '../actions';
import { useAuthFacade } from '@/features/users';
import { useRef, useState } from 'react';
import { PointsListItem } from '../points-list-item/points-list-item';
import { Dimensions, LayoutAnimation } from 'react-native';
import {
  Camera,
  Delete,
  Eye,
  EyeOff,
  Minimize,
  Upload,
} from '@tamagui/lucide-icons';
import MapView, { Marker, MarkerDragStartEndEvent } from 'react-native-maps';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const PointsList = ({
  listRef,
  tripId,
  tripDates,
  tripPoints,
  tripScheme,
  removeScheme,
  uploadScheme,
  setTripPoints,
  setFullScreenImage,
  fetchAllData,
}: PointsListProps) => {
  const [isPointsLoading, setIsPointsLoading] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [kmlReady, setKmlReady] = useState(false);
  const insets = useSafeAreaInsets();
  const tamaguiSpace = getTokens().space.$3.val;
  const theme = useTheme();
  const borderColor = theme.borderColor.val;
  const { accessToken } = useAuthFacade();
  const mapRef = useRef<MapView>(null);
  const { width, height } = Dimensions.get('window');
  const isLandscape = Boolean(width > height);

  const handleRefresh = () => {
    setIsPointsLoading(true);
    fetchAllData().finally(() => {
      setIsPointsLoading(false);
    });
  };

  const handleEndReached = () => {
    if (tripPoints?.next) {
      fetchTripPoints(tripId, accessToken, tripPoints.next).then(data => {
        const { next, previous, results, count } = data;
        setTripPoints(draft => {
          if (draft) {
            draft.next = next;
            draft.previous = previous;
            draft.results.push(...results);
            draft.count = count;
          }
        });
      });
    }
  };

  const handleDeletePoint = async (pointId: number) => {
    await deletePoint(pointId, accessToken).then(() => {
      setTripPoints(draft => {
        if (draft) {
          draft.results = draft.results.filter(p => p.id !== pointId);
        }
      });
      listRef.current?.prepareForLayoutAnimationRender();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
  };

  const handleMarkerDragEnd = async (
    e: MarkerDragStartEndEvent,
    pointId: number,
  ) => {
    e.persist();
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const parsedLatitude = parseFloat(latitude.toFixed(6));
    const parsedLongitude = parseFloat(longitude.toFixed(6));
    updatePointDetails(
      pointId,
      {
        latitude: parsedLatitude,
        longitude: parsedLongitude,
      },
      accessToken,
    ).then(() => {
      setTripPoints(draft => {
        if (draft) {
          draft.results = draft.results.map(p => {
            if (p.id === pointId) {
              return {
                ...p,
                latitude: parsedLatitude,
                longitude: parsedLongitude,
              };
            }
            return p;
          });
        }
      });
    });
  };

  const assetToFormData = (uri: string, name: string) => {
    const formData = new FormData();
    formData.append(
      'scheme',
      JSON.parse(
        JSON.stringify({
          uri: uri,
          type: 'image/jpeg',
          name: name,
        }),
      ),
    );
    return formData;
  };

  const chooseScheme = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets) {
      const formData = assetToFormData(
        result.assets[0].uri,
        result.assets[0].uri.split('/').pop(),
      );
      uploadScheme(formData);
    }
  };

  const takeSnapshot = async () => {
    if (mapRef || mapRef.current) {
      mapRef.current?.fitToElements({ animated: false });

      await new Promise(resolve => setTimeout(resolve, 350));

      await mapRef.current
        .takeSnapshot({
          format: 'jpg',
          quality: 0.5,
          result: 'file',
        })
        .then(uri => {
          const formData = assetToFormData(uri, uri.split('/').pop());
          uploadScheme(formData);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <FlashList
      ref={listRef}
      onRefresh={handleRefresh}
      ItemSeparatorComponent={() => <View h="$1" />}
      contentContainerStyle={{ paddingBottom: tamaguiSpace + insets.bottom }}
      refreshing={isPointsLoading}
      ListHeaderComponent={
        <YStack
          gap={'$3'}
          mb={'$3'}
          ai={'center'}>
          <View w={'100%'}>
            <TripDatesCalendar
              tripId={tripId}
              dates={tripDates}
            />
          </View>
          <YStack
            gap={'$3'}
            jc={'center'}
            ai={'center'}>
            <H5
              textAlign="center"
              fontWeight={'bold'}>
              Схема рекогносцировки
            </H5>
            {tripScheme && (
              <View
                h={isLandscape ? height : width}
                w={isLandscape ? height : width}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: tripScheme.uri || undefined }}
                  placeholder={tripScheme.blurhash}
                  contentFit="contain"
                />
              </View>
            )}
            <XStack
              flexWrap="wrap"
              width={'100%'}
              gap={'$1.5'}>
              <Button
                icon={Delete}
                disabled={!Boolean(tripScheme)}
                theme={Boolean(tripScheme) ? 'red_active' : 'red'}
                onPress={removeScheme}>
                Очистить
              </Button>
              <Button
                icon={Upload}
                onPress={chooseScheme}
                theme={'active'}>
                Загрузить
              </Button>
              {showMap && (
                <Button
                  icon={Camera}
                  onPress={takeSnapshot}
                  theme={'active'}
                  disabled={kmlReady && mapLoaded}>
                  Снимок карты
                </Button>
              )}
            </XStack>
          </YStack>
          {showMap && (
            <Animated.View
              style={{ position: 'relative' }}
              exiting={FadeOut}
              entering={FadeIn}>
              <MapView
                onMapReady={() => setMapLoaded(true)}
                onKmlReady={() => setKmlReady(true)}
                ref={mapRef}
                style={{
                  width: isLandscape ? height : width,
                  height: isLandscape ? height : width,
                  borderRadius: 10,
                  borderColor,
                  borderWidth: 1,
                }}>
                {tripPoints?.results.map(
                  (point, idx) =>
                    Boolean(point.latitude && point.longitude) && (
                      <Marker
                        draggable
                        onDragEnd={e => handleMarkerDragEnd(e, point.id)}
                        key={point.id.toString()}
                        coordinate={{
                          latitude: point.latitude!,
                          longitude: point.longitude!,
                        }}>
                        <Circle
                          backgrounded
                          shadowRadius={'$1.5'}
                          shadowOpacity={0.5}
                          ai={'center'}
                          jc={'center'}
                          size={36}>
                          <Text textAlign="center">{idx + 1}</Text>
                        </Circle>
                      </Marker>
                    ),
                )}
              </MapView>
              <Button
                icon={Minimize}
                position="absolute"
                bottom={'$3'}
                right={'$3'}
                circular
                shadowRadius={'$1.5'}
                shadowOpacity={0.5}
                onPress={() => {
                  mapRef.current?.fitToElements({ animated: false });
                }}
              />
            </Animated.View>
          )}
          <Button
            onPress={() => setShowMap(!showMap)}
            icon={showMap ? EyeOff : Eye}
            theme={'active'}>
            {showMap ? 'Скрыть карту' : 'Показать карту'}
          </Button>
        </YStack>
      }
      keyExtractor={item => item.id.toString()}
      data={tripPoints?.results}
      onEndReached={handleEndReached}
      renderItem={({ item, index }) => {
        return (
          <PointsListItem
            pointNumber={index}
            point={item}
            setFullScreenImage={setFullScreenImage}
            deletePoint={handleDeletePoint}
          />
        );
      }}
      estimatedItemSize={600}
      extraData={[tripPoints?.results.length]}
    />
  );
};
