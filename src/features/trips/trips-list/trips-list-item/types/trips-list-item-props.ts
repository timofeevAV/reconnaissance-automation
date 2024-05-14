import { Trip } from '@/features/trips/types';
import { ListItemProps } from 'tamagui';
export type TripsListItemType = Pick<Trip, 'id' | 'name' | 'updatedAt'>;

export interface TripsListItemProps extends ListItemProps {
  trip: TripsListItemType;
  selectMode: boolean;
  selected: boolean;
  selectItem: (id: number) => void;
  navigation: any;
}
