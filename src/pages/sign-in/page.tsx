import { SafeAreaView } from "@features/ui";
import { SignInPageProps } from "./sign-in-page-props";
import { Button } from "tamagui";
import { SignInForm } from "@features/users";

export const SignIn = (props: SignInPageProps) => {
  const { navigation } = props;

  return (
    <SafeAreaView>
      <SignInForm />
      <Button onPress={() => navigation.navigate("sign-up")}>
        go to sign-up
      </Button>
      <Button onPress={() => navigation.navigate("tests")}>go to tests</Button>
    </SafeAreaView>
  );
};
