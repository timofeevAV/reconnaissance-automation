import { Button } from 'tamagui';
import { SignUpPageProps } from './sign-up-page-props';
import { SignUpForm } from '@/features/users';
import { DismissKeyboardView, SafeAreaView } from '@/features/ui';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const SignUp = (props: SignUpPageProps) => {
  const { navigation } = props;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <DismissKeyboardView
        flexGrow={1}
        justifyContent="center">
        <SignUpForm />
        <Button onPress={() => navigation.navigate('trips')}>
          go to testripsts
        </Button>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
