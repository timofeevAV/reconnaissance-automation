import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TripDetails } from '@/pages';
import Tabs from '../bottom-tabs/bottom-tabs';
import { MainStackParamsList } from './types';

const Stack = createNativeStackNavigator<MainStackParamsList>();

const MainStack = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="trip-details"
        component={TripDetails}
        options={({ route }) => ({ title: route.params?.title })}
      />
    </Stack.Group>
  );
};

export default MainStack;
