import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabsParamsList } from './bottom-tabs-params-list';

export type BottomTabsScreenBaseProps<T extends keyof BottomTabsParamsList> =
  BottomTabScreenProps<BottomTabsParamsList, T>;
