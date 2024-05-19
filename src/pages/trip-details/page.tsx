import {
  DownloadTripLogButton,
  EditTripDataSheet,
  useTripsFacade,
} from '@/features/trips';
import { Trip } from '@/features/trips/types';
import { useAuthFacade } from '@/features/users';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Button, H3, H5, View, XStack, YStack, getTokens } from 'tamagui';
import { useImmer } from 'use-immer';
import { TripDetailsPageProps } from './trip-details-page-props';
import { LoadingScreen } from '@/features/ui';
import { Download, Plus } from '@tamagui/lucide-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createTripPoint, fetchTripPoints } from '@/features/points/actions';
import { PointsList } from '@/features/points';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Point, PointPhoto, PointsPagination } from '@/features/points/types';
import { Alert, Dimensions, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';

const BASE_URL =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_BASE_URL,
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
  }) + '/api';

export const TripDetails = ({ navigation, route }: TripDetailsPageProps) => {
  const { fetchTrip, fetchTripDates } = useTripsFacade();
  const { accessToken } = useAuthFacade();
  const tripId = route.params?.tripId;
  const [trip, setTrip] = useImmer<Trip | null>(null);
  const [tripDates, setTripDates] = useImmer<
    Record<string, { id: number; selected: boolean }>
  >({});
  const [tripPoints, setTripPoints] = useImmer<PointsPagination | null>(null);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const insets = useSafeAreaInsets();
  const tamaguiSpace = getTokens().space.$3.val;
  const [fullScreenImage, setFullScreenImage] = useState<PointPhoto | null>(
    null,
  );
  const listRef = useRef<FlashList<Point>>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    })();
  }, []);

  const fetchAllData = useCallback(async () => {
    if (tripId) {
      await Promise.all([
        fetchTrip(tripId, accessToken).then(data => {
          setTrip(data);
        }),
        fetchTripDates(tripId, accessToken).then(data => {
          setTripDates(data);
        }),
        fetchTripPoints(tripId, accessToken).then(data => {
          setTripPoints(data);
        }),
      ])
        .then(() => {
          setFetchError(false);
        })
        .catch(() => {
          setFetchError(true);
        });
    }
  }, [
    tripId,
    fetchTrip,
    accessToken,
    fetchTripDates,
    setTrip,
    setTripDates,
    setTripPoints,
  ]);

  useEffect(() => {
    setIsLoading(true);
    fetchAllData().finally(() => {
      setIsLoading(false);
    });
  }, [fetchAllData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        trip && (
          <XStack
            ai={'center'}
            gap={'$3'}>
            <DownloadTripLogButton
              tripId={trip.id}
              tripName={trip.name}
            />
            <EditTripDataSheet
              trip={trip}
              setTrip={setTrip}
              navigation={navigation}
            />
          </XStack>
        ),
    });
  }, [navigation, tripId, trip, setTrip]);

  const handleRemoveScheme = async () => {
    await axios
      .patch(
        `${BASE_URL}/trip/${tripId}/`,
        { scheme: null },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        },
      )
      .then(() => {
        setTrip(draft => {
          if (draft) {
            draft.scheme = null;
            draft.blurhash = null;
          }
        });
      })
      .catch(error => {
        console.error(error);
        alert('Ошибка при удалении изображения');
      });
  };

  const handleUploadScheme = async (formData: FormData) => {
    await axios
      .patch(`${BASE_URL}/trip/${tripId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(response => {
        setTrip(draft => {
          if (draft) {
            draft.scheme = response.data.scheme;
            draft.blurhash = response.data.blurhash;
          }
        });
      })
      .catch(error => {
        console.error(error);
        alert('Ошибка при загрузке схемы рекогносцировки');
      });
  };

  if (fetchError || !tripId) {
    return (
      <View
        flex={1}
        jc={'center'}
        ai="center">
        <YStack
          gap="$3"
          alignItems="center">
          <H3 textAlign="center">Произошла ошибка</H3>
          {tripId ? (
            <H5
              onPress={fetchAllData}
              color={'$blue11'}
              selectable={false}
              pressStyle={{ scale: 0.95, opacity: 0.5 }}>
              Повторить
            </H5>
          ) : (
            <H5>Возможно, элемент был удалён</H5>
          )}
        </YStack>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View flex={1}>
      <PointsList
        listRef={listRef}
        tripId={tripId}
        tripDates={tripDates}
        tripScheme={
          trip?.scheme
            ? { uri: trip.scheme, blurhash: trip.blurhash }
            : undefined
        }
        removeScheme={handleRemoveScheme}
        uploadScheme={handleUploadScheme}
        tripPoints={tripPoints}
        setTripPoints={setTripPoints}
        setFullScreenImage={setFullScreenImage}
        fetchAllData={fetchAllData}
      />
      <Button
        bordered
        position="absolute"
        bottom={tamaguiSpace + insets.bottom}
        right={'$3'}
        alignSelf="flex-end"
        icon={Plus}
        p={'$3'}
        circular
        theme={'blue_active'}
        shadowRadius={'$1.5'}
        shadowOpacity={0.5}
        onPress={() => {
          createTripPoint(tripId, accessToken).then(data => {
            setTripPoints(draft => {
              if (draft) {
                draft.results.push(data);
              }
            });
          });
        }}
      />
      {fullScreenImage && (
        <View
          position="absolute"
          width={'100%'}
          height={'100%'}
          top={0}
          left={0}
          ai={'center'}
          jc={'center'}
          onPress={() => setFullScreenImage(null)}>
          <Animated.View
            style={{
              width: Dimensions.get('window').width,
            }}
            entering={FadeIn}>
            <Image
              source={{ uri: fullScreenImage.photo || '' }}
              style={{ width: '100%', height: '100%' }}
              placeholder={fullScreenImage.blurhash}
              contentFit="contain"
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
};
