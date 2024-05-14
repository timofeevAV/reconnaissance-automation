import { FlashList } from '@shopify/flash-list';
import { TripsListItemType } from '../trips-list-item/types';

export interface TripsListProps {
  listRef: React.MutableRefObject<FlashList<TripsListItemType> | null>;
  selectMode: boolean;
  selectedItems: number[];
  selectItem: (id: number) => void;
  navigation: any;
}
