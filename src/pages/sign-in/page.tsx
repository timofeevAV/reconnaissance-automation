import { SignInPageProps } from './sign-in-page-props';
import { H3, H5, Text, XStack, YStack } from 'tamagui';
import { SignInForm } from '@/features/users';
import { DismissKeyboardView } from '@/features/ui';

export const SignIn = (props: SignInPageProps) => {
  const { navigation } = props;

  return (
    <DismissKeyboardView
      paddingHorizontal={'$3'}
      flex={1}
      justifyContent="center">
      <YStack gap={'$3'}>
        <SignInForm />
        <XStack
          alignSelf="center"
          flexWrap="wrap"
          gap="$1.5">
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
      </YStack>
    </DismissKeyboardView>
  );
};
