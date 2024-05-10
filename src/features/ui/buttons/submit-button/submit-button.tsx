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
      icon={isSubmitting ? <Spinner /> : undefined}
      theme={isSubmitting || props.disabled ? undefined : 'active'}
      {...props}>
      {children}
    </Button>
  );
};
