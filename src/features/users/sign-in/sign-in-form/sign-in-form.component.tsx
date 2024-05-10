import { FormWithValidation } from '@/features/ui';
import { z } from 'zod';

const signUpValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Обязательное поле',
    })
    .email('Неверный адрес электронной почты'),
  password: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(6, 'Пароль должен содержать хотя бы 6 символов'),
});

const initialValues = [
  { key: 'email', value: 'johndoe@mail.ru', label: 'Адрес эл.почты' },
  { key: 'password', value: 'pass123', label: 'Пароль' },
];

export const SignInForm = () => {
  const handleSignIn = async (values: Record<string, any>) => {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <FormWithValidation
      formName="sign-in"
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSignIn}
      title="Войти"
    />
  );
};
