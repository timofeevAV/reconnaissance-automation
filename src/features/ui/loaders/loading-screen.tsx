import { Spinner, View, ViewProps } from 'tamagui';

export const LoadingScreen = (props: ViewProps) => {
  return (
    <View
      ai={'center'}
      jc={'center'}
      flex={1}
      {...props}>
      <Spinner size="large" />
    </View>
  );
};
