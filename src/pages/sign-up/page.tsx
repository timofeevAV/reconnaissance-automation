import { View, Text, Button } from "tamagui";
import { SignUpPageProps } from "./sign-up-page-props";
import { SignUpForm } from "@features/users";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const SignUp = (props: SignUpPageProps) => {
  const { navigation } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
      style={{ flex: 1, backgroundColor: "#000000" }}
    >
      <View>
        <SignUpForm />
        <Button
          onPress={(e) => {
            // e.stopPropagation();
            navigation.navigate("sign-in");
          }}
        >
          Go to sign-in
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
