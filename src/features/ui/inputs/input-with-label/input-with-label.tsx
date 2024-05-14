import { Fieldset, Input, Label, XStack } from 'tamagui';
import { InputWithLabelProps } from './types';
import { ErrorTooltip } from '@/features/ui/tooltips/error-tooltip/error-tooltip';

export const InputWithLabel = ({
  label,
  name,
  value,
  error,
  ...props
}: InputWithLabelProps) => {
  return (
    <Fieldset>
      <Label htmlFor={name}>{label}</Label>
      <XStack
        alignItems="center"
        gap="$2">
        <Input
          value={value}
          flex={1}
          id={name}
          theme={error ? 'red' : undefined}
          {...props}
        />
        {error && <ErrorTooltip text={error} />}
      </XStack>
    </Fieldset>
  );
};
