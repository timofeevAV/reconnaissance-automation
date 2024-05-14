import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { SafeAreaViewProps } from './types';

export const SafeAreaView = ({
  children,
  allSafe,
  topBottomSafe,
  leftRightSafe,
  topSafe,
  bottomSafe,
  leftSafe,
  rightSafe,
  ...props
}: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  const safeAreaStyles = {
    paddingTop:
      topSafe !== false && (allSafe || topBottomSafe || topSafe)
        ? insets.top
        : 0,
    paddingBottom:
      bottomSafe !== false && (allSafe || topBottomSafe || bottomSafe)
        ? insets.bottom
        : 0,
    paddingLeft:
      leftSafe !== false && (allSafe || leftRightSafe || leftSafe)
        ? insets.left
        : 0,
    paddingRight:
      rightSafe !== false && (allSafe || leftRightSafe || rightSafe)
        ? insets.right
        : 0,
  };

  return (
    <View
      style={safeAreaStyles}
      {...props}>
      {children}
    </View>
  );
};
