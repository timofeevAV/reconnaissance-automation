import '@tamagui/core/reset.css';
import {
  NavigationContainer,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TamaguiProvider } from '@tamagui/core';
import { useColorScheme } from 'react-native';
import tamaguiConfig from './tamagui.config';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PortalProvider } from 'tamagui';
import { HeaderBackButton } from '@/features/ui';
import { useAuthFacade } from '@/features/users';
import { AuthenticationStack, MainStack } from '@/features/navigation';
import * as Linking from 'expo-linking';
import { NotFound } from '@/pages';

const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      'not-found': '*',
      // activate: {
      //   path: 'activate/:uid/:token',
      //   parse: { uid: () => 'string', token: () => 'string' },
      // },
    },
  },
};

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const { user, bootstrap, isLoading } = useAuthFacade();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

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
    if (!isLoading && (fontsLoaded || fontError)) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isLoading]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PortalProvider>
      <NavigationContainer linking={linking}>
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
                headerLeft: props => (
                  <HeaderBackButton
                    navigation={navigation}
                    {...props}
                  />
                ),
              })}>
              {user ? MainStack() : AuthenticationStack()}
              <Stack.Screen
                component={NotFound}
                name="not-found"
                options={({ navigation }) => ({
                  presentation: 'modal',
                  title: '',
                  headerTransparent: true,
                  headerShown: navigation.canGoBack(),
                })}
              />
            </Stack.Navigator>
          </ThemeProvider>
        </TamaguiProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PortalProvider>
  );
}
