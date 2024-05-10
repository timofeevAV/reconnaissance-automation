import {
  NavigationContainer,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, SignUp, Trips, TripDetails } from '@/pages';
import '@tamagui/core/reset.css';
import { TamaguiProvider } from '@tamagui/core';
import { useColorScheme } from 'react-native';
import tamaguiConfig from './tamagui.config';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PortalProvider, useTheme } from 'tamagui';
import { HeaderBackButton } from '@/features/ui';

SplashScreen.preventAutoHideAsync();

type RootStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  trips: undefined;
  'trip-details': { title: string | undefined } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'Involve-Bold': require('./assets/fonts/involve/Involve-Bold.otf'),
    'Involve-BoldOblique': require('./assets/fonts/involve/Involve-BoldOblique.otf'),
    'Involve-Medium': require('./assets/fonts/involve/Involve-Medium.otf'),
    'Involve-MediumOblique': require('./assets/fonts/involve/Involve-MediumOblique.otf'),
    'Involve-Oblique': require('./assets/fonts/involve/Involve-Oblique.otf'),
    'Involve-Regular': require('./assets/fonts/involve/Involve-Regular.otf'),
    'Involve-SemiBold': require('./assets/fonts/involve/Involve-SemiBold.otf'),
    'Involve-SemiBoldOblique': require('./assets/fonts/involve/Involve-SemiBoldOblique.otf'),
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
    <PortalProvider>
      <NavigationContainer>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={colorScheme || undefined}>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator
              screenOptions={({ navigation }) => ({
                headerTitleStyle: {
                  fontFamily: 'Involve-Bold',
                },
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerLeft: props => (
                  <HeaderBackButton
                    navigation={navigation}
                    {...props}
                  />
                ),
              })}>
              <Stack.Group
                screenOptions={{
                  headerTitle: '',
                }}>
                <Stack.Screen
                  name="sign-in"
                  component={SignIn}
                />
                <Stack.Screen
                  name="sign-up"
                  component={SignUp}
                />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  headerBlurEffect: colorScheme === 'dark' ? 'dark' : 'light',
                }}>
                <Stack.Screen
                  name="trips"
                  component={Trips}
                  options={{
                    headerLargeTitle: true,
                    title: 'Выезды',
                  }}
                />
                <Stack.Screen
                  name="trip-details"
                  component={TripDetails}
                  options={({ route }) => ({
                    title: route.params?.title,
                  })}
                />
              </Stack.Group>
            </Stack.Navigator>
          </ThemeProvider>
        </TamaguiProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PortalProvider>
  );
}
