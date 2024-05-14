import { FormWithValidation } from '@/features/ui';
import { initialValues, signInValidationSchema } from './sign-in-form.conf';
import { useAuthFacade } from '../../facades';

export const SignInForm = () => {
  const { signIn } = useAuthFacade();

  return (
    <FormWithValidation
      formName="sign-in"
      validationSchema={signInValidationSchema}
      initialValues={initialValues}
      onSubmit={signIn}
      title="Войти"
    />
  );
};
