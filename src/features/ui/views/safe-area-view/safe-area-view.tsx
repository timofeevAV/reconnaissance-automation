import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, ViewProps } from "tamagui";
import { SafeAreaViewProps } from "./types";

export const SafeAreaView = ({
  children,
  allSafe,
  upDownSafe,
  leftRightSafe,
  ...props
}: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  const safeAreaStyles = {
    paddingTop: allSafe || upDownSafe ? insets.top : 0,
    paddingBottom: allSafe || upDownSafe ? insets.bottom : 0,
    paddingLeft: allSafe || leftRightSafe ? insets.left : 0,
    paddingRight: allSafe || leftRightSafe ? insets.right : 0,
  };

  return (
    <View style={safeAreaStyles} {...props}>
      {children}
    </View>
  );
};
