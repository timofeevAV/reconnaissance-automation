import { Input, Label, XStack } from "tamagui";
import { FormInputProps } from "./types";
import { ErrorTooltip } from "@features/ui/tooltips/error-tooltip/error-tooltip";

export const FormInput = (props: FormInputProps) => {
  const { label, name, value, error, handleChangeText, handleBlur, rest } =
    props;

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <XStack alignItems="center" gap="$2">
        <Input
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          value={value}
          flex={1}
          id={name}
          theme={error ? "red" : undefined}
          {...rest}
        />
        {error && <ErrorTooltip text={error} />}
      </XStack>
    </>
  );
};
