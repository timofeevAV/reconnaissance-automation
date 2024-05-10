import { FormWithValidation } from '@/features/ui';
import { FormField } from '@/features/ui/forms/form-with-validation/types';
import { z } from 'zod';

const signUpValidationSchema = z
  .object({
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
    rePassword: z.string({
      required_error: 'Обязательное поле',
    }),
  })
  .refine(data => data.password === data.rePassword, {
    message: 'Пароли не совпадают',
    path: ['rePassword'],
  });

const initialValues: FormField[] = [
  {
    key: 'email',
    value: 'johndoe@mail.ru',
    label: 'Адрес эл.почты',
    additionalProps: {
      autoCorrect: false,
      autoComplete: 'email',
    },
  },
  {
    key: 'password',
    value: 'pass123',
    label: 'Пароль',
    additionalProps: {
      secureTextEntry: true,
      autoCorrect: false,
      autoComplete: 'new-password',
    },
  },
  {
    key: 'rePassword',
    value: 'pass123',
    label: 'Повторите пароль',
    additionalProps: {
      secureTextEntry: true,
      autoCorrect: false,
      autoComplete: 'new-password',
    },
  },
];

export const SignUpForm = () => {
  const handleSignIn = async (values: Record<string, any>) => {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <FormWithValidation
      formName="sign-up"
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSignIn}
      title="Зарегистрироваться"
      paddingHorizontal={'$3'}
    />
  );
};
