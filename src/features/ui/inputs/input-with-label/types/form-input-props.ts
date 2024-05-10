import { InputProps } from 'tamagui';

export interface FormInputProps extends InputProps {
  label?: string;
  name?: string;
  value?: string;
  error: string | undefined;
}
