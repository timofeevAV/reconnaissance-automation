import React, { memo, useState } from 'react';
import { View, getTokens } from 'tamagui';
import { FlashList } from '@shopify/flash-list';
import { Platform } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTripsFacade } from '../facades';
import { TripsListItem } from './trips-list-item/trips-list-item';
import { TripsListProps } from './types';
import { TripsListItemType } from './trips-list-item/types';
import { useAuthFacade } from '@/features/users';
import { SearchTripsInput } from '../search-trips-input/search-trips-input';

export const TripsList = ({
  listRef,
  selectMode,
  selectedItems,
  selectItem,
  navigation,
}: TripsListProps) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const tamaguiSpace = getTokens().space['$3'].val;
  const { accessToken } = useAuthFacade();
  const { trips, fetchTrips } = useTripsFacade();
  const [tripsLoading, setTripsLoading] = useState(false);

  const handleRefresh = async () => {
    setTripsLoading(true);
    await fetchTrips(accessToken).finally(() => {
      setTripsLoading(false);
    });
  };

  return (
    <FlashList
      ref={listRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: Platform.select({
          ios: bottomTabBarHeight + tamaguiSpace,
          android: undefined,
        }),
        paddingHorizontal: tamaguiSpace,
      }}
      keyExtractor={item => item.id.toString()}
      data={trips as TripsListItemType[]}
      ListHeaderComponent={<SearchTripsInput marginVertical={'$3'} />}
      ItemSeparatorComponent={memo(function MemoizedSeparator() {
        return <View h={tamaguiSpace} />;
      })}
      renderItem={({ item }) => (
        <TripsListItem
          selectMode={selectMode}
          selectItem={selectItem}
          selected={selectedItems.includes(item.id)}
          trip={item}
          navigation={navigation}
        />
      )}
      onRefresh={handleRefresh}
      refreshing={tripsLoading}
      onEndReached={() => fetchTrips(accessToken, true)}
      onEndReachedThreshold={0.5}
      extraData={[selectMode, selectedItems]}
      estimatedItemSize={70}
    />
  );
};
