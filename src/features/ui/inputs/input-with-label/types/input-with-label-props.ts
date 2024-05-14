import { InputProps } from 'tamagui';

export interface InputWithLabelProps extends InputProps {
  label: string;
  name: string;
  value?: string;
  error?: string | undefined;
}
