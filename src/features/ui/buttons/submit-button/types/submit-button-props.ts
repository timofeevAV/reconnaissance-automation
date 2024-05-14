import { ButtonProps } from 'tamagui';

export interface SubmitButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  children?: React.ReactNode;
}
