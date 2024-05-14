import { FormField } from '@/features/ui/forms/form-with-validation/types';
import { z } from 'zod';

const requiredFieldMessage = 'Обязательное поле';

const signUpValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, requiredFieldMessage)
      .email('Неверный адрес электронной почты'),
    lastName: z.string().min(1, requiredFieldMessage),
    firstName: z.string().min(1, requiredFieldMessage),
    middleName: z.string().min(1, requiredFieldMessage),
    role: z.string().min(1, requiredFieldMessage),
    password: z
      .string({
        required_error: requiredFieldMessage,
      })
      .min(6, 'Пароль должен содержать хотя бы 6 символов'),
    re_password: z.string({
      required_error: requiredFieldMessage,
    }),
  })
  .refine(data => data.password === data.re_password, {
    message: 'Пароли не совпадают',
    path: ['re_password'],
  });

const passwordInputStyles = {
  secureTextEntry: true,
  autoCorrect: false,
};

const initialValues: FormField[] = [
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
    key: 'lastName',
    value: 'Тимофеев',
    label: 'Фамилия',
  },
  {
    key: 'firstName',
    value: 'Артём',
    label: 'Имя',
  },
  {
    key: 'middleName',
    value: 'Валерьевич',
    label: 'Отчество',
  },
  {
    key: 'role',
    value: 'Студент',
    label: 'Роль',
  },
  {
    key: 'password',
    value: 'longpassword123',
    label: 'Пароль',
    additionalProps: {
      ...passwordInputStyles,
      autoComplete: 'new-password',
    },
  },
  {
    key: 're_password',
    value: 'longpassword123',
    label: 'Повторите пароль',
    additionalProps: {
      ...passwordInputStyles,
      autoComplete: 'new-password',
    },
  },
];

export { signUpValidationSchema, initialValues };
