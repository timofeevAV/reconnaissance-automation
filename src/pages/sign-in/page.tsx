import { SignInPageProps } from './sign-in-page-props';
import { Button, Text, XStack } from 'tamagui';
import { SignInForm } from '@/features/users';
import { DismissKeyboardView, SafeAreaView } from '@/features/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SignIn = (props: SignInPageProps) => {
  const { navigation } = props;
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      allSafe
      flex={1}>
      <DismissKeyboardView
        paddingHorizontal={'$3'}
        flexGrow={1}
        justifyContent="center">
        <SignInForm />
        <Button onPress={() => navigation.navigate('trips')}>
          go to trips
        </Button>
        <XStack
          alignSelf="center"
          position="absolute"
          bottom={insets.bottom ? insets.bottom : '$3'}
          flexWrap="wrap"
          gap="$1">
          <Text textAlign="center">Ещё не зарегистрированы?</Text>
          <Text
            pressStyle={{
              opacity: 0.5,
              scale: 0.95,
            }}
            onPress={() => navigation.navigate('sign-up')}
            color={'$blue11'}>
            Зарегистрироваться
          </Text>
        </XStack>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};
