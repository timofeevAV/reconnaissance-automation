import React from 'react';
import { ListItem } from 'tamagui';
import { TripsListItemProps } from './types';
import { Check } from '@tamagui/lucide-icons';
import { formatDate } from '@/features/utils';

export const TripsListItem = ({
  trip,
  selectMode,
  selectItem,
  selected,
  navigation,
  ...props
}: TripsListItemProps) => {
  return (
    <ListItem
      bordered
      pressTheme
      borderRadius={'$7'}
      title={trip.name}
      subTitle={`Последнее изменение: ${formatDate(trip.updatedAt)}`}
      onPress={
        selectMode
          ? () => selectItem(trip.id)
          : () =>
              navigation.navigate('trip-details', {
                title: trip.name,
                tripId: trip.id,
              })
      }
      iconAfter={selected ? Check : undefined}
      {...props}
    />
  );
};
