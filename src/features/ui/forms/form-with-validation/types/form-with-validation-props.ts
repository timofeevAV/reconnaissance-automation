import { z } from "zod";
import { FormField } from "./form-field";

export interface FormWithValidationProps {
  formName: string;
  validationSchema: z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;
  initialValues: FormField[];
  onSubmit: (values: Record<string, any>) => Promise<void>;
  title: string;
}
