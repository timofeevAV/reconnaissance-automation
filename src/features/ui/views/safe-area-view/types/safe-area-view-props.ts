import { ViewProps } from 'tamagui';

export interface SafeAreaViewProps extends ViewProps {
  children?: JSX.Element | JSX.Element[];
  allSafe?: boolean;
  topBottomSafe?: boolean;
  leftRightSafe?: boolean;
  topSafe?: boolean;
  bottomSafe?: boolean;
  leftSafe?: boolean;
  rightSafe?: boolean;
}
