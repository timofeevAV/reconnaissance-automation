import { InputProps } from 'tamagui';

export interface FormField {
  key: string;
  value?: any;
  label: string;
  additionalProps?: InputProps;
}
