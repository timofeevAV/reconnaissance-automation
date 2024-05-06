import { Button, Spinner } from "tamagui";
import { SubmitButtonProps } from "./types";

export const SubmitButton = ({
  isSubmitting,
  children,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={isSubmitting}
      icon={isSubmitting ? <Spinner /> : undefined}
      {...props}
    >
      {children}
    </Button>
  );
};
