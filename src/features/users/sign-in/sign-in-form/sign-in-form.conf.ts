import { FormField } from '@/features/ui/forms/form-with-validation/types';
import { z } from 'zod';

export const signInValidationSchema = z.object({
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

export const initialValues: FormField[] = [
  {
    key: 'email',
    value: 'timofeev.a.vch@gmail.com',
    label: 'Адрес эл.почты',
    additionalProps: {
      autoCorrect: false,
      autoComplete: 'email',
      inputMode: 'email',
    },
  },
  {
    key: 'password',
    value: 'longpassword123',
    label: 'Пароль',
    additionalProps: {
      secureTextEntry: true,
      autoCorrect: false,
      autoComplete: 'new-password',
    },
  },
];
