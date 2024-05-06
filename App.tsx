import "react-native-gesture-handler";
import {
  NavigationContainer,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn, SignUp, TestsPage } from "@pages/index";
import "@tamagui/core/reset.css";
import { TamaguiProvider } from "@tamagui/core";
import { useColorScheme } from "react-native";
import tamaguiConfig from "./tamagui.config";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
// import { LogBox } from "react-native";
// LogBox.ignoreLogs(["Warning: ..."]);
// LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    "Involve-Bold": require("./assets/fonts/involve/Involve-Bold.otf"),
    "Involve-BoldOblique": require("./assets/fonts/involve/Involve-BoldOblique.otf"),
    "Involve-Medium": require("./assets/fonts/involve/Involve-Medium.otf"),
    "Involve-MediumOblique": require("./assets/fonts/involve/Involve-MediumOblique.otf"),
    "Involve-Oblique": require("./assets/fonts/involve/Involve-Oblique.otf"),
    "Involve-Regular": require("./assets/fonts/involve/Involve-Regular.otf"),
    "Involve-SemiBold": require("./assets/fonts/involve/Involve-SemiBold.otf"),
    "Involve-SemiBoldOblique": require("./assets/fonts/involve/Involve-SemiBoldOblique.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={colorScheme || undefined}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack.Navigator
              screenOptions={{
                headerTitleStyle: {
                  fontFamily: "Involve-Bold",
                },
              }}
            >
              <Stack.Screen name="sign-in" component={SignIn} />
              <Stack.Screen name="sign-up" component={SignUp} />
              <Stack.Screen name="tests" component={TestsPage} />
            </Stack.Navigator>
          </ThemeProvider>
        </TamaguiProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
