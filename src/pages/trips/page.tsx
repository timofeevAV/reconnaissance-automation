import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useEffect,
} from 'react';
import {
  TripsList,
  SelectModeActions,
  AddTripDialog,
  TripsContextMenu,
} from '@/features/trips';
import { View, getTokens } from 'tamagui';
import { useTripsFacade } from '@/features/trips';
import { Dimensions, LayoutAnimation } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlashList } from '@shopify/flash-list';
import { TripsListItemType } from '@/features/trips/trips-list/trips-list-item/types';
import { useAuthFacade } from '@/features/users/facades';
import { TripsPageProps } from './trips-page-props';

export const Trips = (props: TripsPageProps) => {
  const { navigation } = props;
  const { sort, trips, deleteTrips, fetchTrips } = useTripsFacade();
  const { accessToken } = useAuthFacade();
  const [selectMode, setSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const tamaguiSpace = getTokens().space['$3'].val;
  const list = useRef<FlashList<TripsListItemType> | null>(null);

  useEffect(() => {
    fetchTrips(accessToken);
  }, [accessToken, fetchTrips, sort]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TripsContextMenu
          selectMode={selectMode}
          setSelectMode={setSelectMode}
          setSelectedItems={setSelectedItems}
        />
      ),
      tabBarStyle: {
        display: selectMode ? 'none' : 'flex',
      },
    });
  }, [navigation, selectMode]);

  const selectItem = useCallback((userId: number) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId],
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedItems(prevSelected =>
      prevSelected.length ? [] : trips.map(t => t.id),
    );
  }, [trips]);

  const removeAllSelectedItems = async () => {
    const hideSelectActions = trips.length === selectedItems.length;

    await deleteTrips(selectedItems, accessToken).then(() => {
      setSelectedItems([]);
      list.current?.prepareForLayoutAnimationRender();
      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut,
        () => {
          if (hideSelectActions) {
            setSelectMode(false);
          }
        },
      );
    });
  };

  return (
    <View flex={1}>
      <View
        height={
          Dimensions.get('window').height - bottomTabBarHeight - tamaguiSpace
        }>
        <TripsList
          listRef={list}
          selectMode={selectMode}
          selectedItems={selectedItems}
          selectItem={selectItem}
          navigation={navigation}
        />
      </View>
      {selectMode ? (
        <SelectModeActions
          selectAll={selectAll}
          isItemsSelected={selectedItems.length > 0}
          removeSelectedItems={removeAllSelectedItems}
        />
      ) : (
        <AddTripDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </View>
  );
};
