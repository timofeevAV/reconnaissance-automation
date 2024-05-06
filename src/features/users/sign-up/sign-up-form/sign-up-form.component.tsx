import { FormWithValidation } from "@features/ui";
import { FormField } from "@features/ui/forms/form-with-validation/types";
import { z } from "zod";

const signUpValidationSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

const initialValues: FormField[] = [
  {
    key: "email",
    value: "johndoe@mail.ru",
    label: "Электронный адрес",
    additionalProps: {
      autoCorrect: false,
      autoComplete: "email",
    },
  },
  {
    key: "password",
    value: "pass123",
    label: "Пароль",
    additionalProps: {
      secureTextEntry: true,
      autoCorrect: false,
      autoComplete: "new-password",
    },
  },
  {
    key: "rePassword",
    value: "pass123",
    label: "Повторите пароль",
    additionalProps: {
      secureTextEntry: true,
      autoCorrect: false,
      autoComplete: "new-password",
    },
  },
];

export const SignUpForm = () => {
  const handleSignIn = async (values: Record<string, any>) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <FormWithValidation
      formName="sign-up"
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSignIn}
      title="Зарегистрироваться"
    />
  );
};
