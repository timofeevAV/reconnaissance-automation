import { EditTripDataSheet, useTripsFacade } from '@/features/trips';
import { Trip } from '@/features/trips/types';
import { useAuthFacade } from '@/features/users';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { H3, H5, View, YStack } from 'tamagui';
import { useImmer } from 'use-immer';
import { TripDetailsPageProps } from './trip-details-page-props';

export const TripDetails = ({ navigation, route }: TripDetailsPageProps) => {
  const { fetchTrip } = useTripsFacade();
  const { accessToken } = useAuthFacade();
  const tripId = route.params?.tripId;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trip, setTrip] = useImmer<Trip | null>(null);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchAllData = useCallback(async () => {
    if (tripId) {
      await Promise.all([
        fetchTrip(tripId, accessToken).then(data => {
          setTrip(data);
        }),
      ])
        .then(() => {
          setFetchError(false);
        })
        .catch(() => {
          setFetchError(true);
        });
    }
  }, [fetchTrip, tripId, accessToken, setTrip]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        trip && (
          <EditTripDataSheet
            trip={trip}
            navigation={navigation}
          />
        ),
    });
  }, [navigation, tripId, dialogOpen, setDialogOpen, trip, setTrip]);

  if (fetchError) {
    return (
      <View
        flex={1}
        jc={'center'}
        ai="center">
        <YStack
          gap="$3"
          alignItems="center">
          <H3 textAlign="center">Произошла ошибка</H3>
          <H5
            onPress={fetchAllData}
            color={'$blue11'}
            selectable={false}
            pressStyle={{ scale: 0.95, opacity: 0.5 }}>
            Повторить
          </H5>
        </YStack>
      </View>
    );
  }

  return <View flex={1}></View>;
};
