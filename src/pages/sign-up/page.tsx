import { SignUpPageProps } from './sign-up-page-props';
import { SignUpForm } from '@/features/users';
import { DismissKeyboardView } from '@/features/ui';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const SignUp = (props: SignUpPageProps) => {
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
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
