import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamsList } from './auth-stack-params-list';

export type AuthStackScreenBaseProps<T extends keyof AuthStackParamsList> =
  NativeStackScreenProps<AuthStackParamsList, T>;
