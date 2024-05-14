import { View, Text, H3, H5, YStack } from 'tamagui';
import { ActivateScreenProps } from './activate-screen-props';

export const Activate = ({ navigation, route }: ActivateScreenProps) => {
  const { uid, token } = route.params || {};

  return (
    <View
      flex={1}
      jc={'center'}
      ai="center">
      {!uid || !token ? (
        <YStack gap="$3">
          <H3 textAlign="center">Произошла ошибка</H3>
          <H5
            onPress={() => navigation.navigate('sign-in')}
            color={'$blue11'}
            selectable={false}
            pressStyle={{ scale: 0.95, opacity: 0.5 }}>
            Перейти на страницу входа
          </H5>
        </YStack>
      ) : (
        <>
          <Text>uid: {uid}</Text>
          <Text>token: {token}</Text>
        </>
      )}
    </View>
  );
};
