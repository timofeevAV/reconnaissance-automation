import { ViewProps } from 'tamagui';

export interface SafeAreaViewProps extends ViewProps {
  children?: JSX.Element | JSX.Element[];
  allSafe?: boolean;
  upDownSafe?: boolean;
  leftRightSafe?: boolean;
}
