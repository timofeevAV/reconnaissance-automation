import { Button, Spinner } from 'tamagui';
import { SubmitButtonProps } from './types';

export const SubmitButton = ({
  isSubmitting,
  children,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={isSubmitting || props.disabled}
      theme={isSubmitting || props.disabled ? undefined : 'active'}
      {...props}
      icon={isSubmitting ? <Spinner /> : props.icon}>
      {children}
    </Button>
  );
};
