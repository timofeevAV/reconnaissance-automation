import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, SignUp, Activate } from '@/pages';
import { AuthStackParamsList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamsList>();

const AuthenticationStack = () => {
  return (
    <Stack.Group
      screenOptions={{
        title: '',
        headerTransparent: true,
      }}>
      <Stack.Screen
        name="sign-in"
        component={SignIn}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUp}
      />
      <Stack.Screen
        name="activate"
        component={Activate}
      />
    </Stack.Group>
  );
};

export default AuthenticationStack;
