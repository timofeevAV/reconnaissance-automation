import { FormWithValidation } from "@features/ui";
import { z } from "zod";

const signUpValidationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const initialValues = [
  { key: "email", value: "johndoe@mail.ru", label: "Электронный адрес" },
  { key: "password", value: "pass123", label: "Пароль" },
];

export const SignInForm = () => {
  const handleSignIn = async (values: Record<string, any>) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 2000));
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