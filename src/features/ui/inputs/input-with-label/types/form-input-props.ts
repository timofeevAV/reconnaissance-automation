import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { InputProps } from "tamagui";

export interface FormInputProps {
  label?: string;
  name?: string;
  value?: string;
  error: string | undefined;
  handleChangeText: (text: string) => void;
  handleBlur:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  rest?: InputProps;
}
