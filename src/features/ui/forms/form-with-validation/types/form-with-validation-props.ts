import { z } from 'zod';
import { FormField } from './form-field';
import { ButtonProps, FormProps } from 'tamagui';

export interface FormWithValidationProps extends Omit<FormProps, 'onSubmit'> {
  formName: string;
  validationSchema: z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;
  initialValues: FormField[];
  onSubmit: (...args: any[]) => void;
  buttonProps?: ButtonProps;
  title: string;
}
