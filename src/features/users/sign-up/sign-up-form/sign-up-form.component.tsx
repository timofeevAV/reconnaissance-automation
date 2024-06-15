import { FormWithValidation } from '@/features/ui';
import { signUpValidationSchema, initialValues } from './sign-up-form.conf';
import { useAuthFacade } from '../../facades';

export const SignUpForm = () => {
  const { signUp } = useAuthFacade();

  return (
    <FormWithValidation
      formName="sign-up"
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={async userData =>
        await signUp(userData)
          .catch(e => {
            alert(e);
          })
          .then(() => {
            alert(
              'Для завершения регистрации перейдите по ссылке в письме, которое мы отправили вам на почту',
            );
          })
      }
      title="Зарегистрироваться"
      paddingHorizontal={'$3'}
    />
  );
};
