import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamsList } from './main-stack-params-list';

export type MainStackScreenBaseProps<T extends keyof MainStackParamsList> =
  NativeStackScreenProps<MainStackParamsList, T>;
