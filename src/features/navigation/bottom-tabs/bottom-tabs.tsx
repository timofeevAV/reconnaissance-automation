import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Trips, TripsMap, Profile } from '@/pages';
import { TabBarIcon } from '@/features/ui';
import { Home, Map, User, Wrench } from '@tamagui/lucide-icons';
import { BottomTabsParamsList } from './types/bottom-tabs-params-list';
import TopTabs from '../top-tabs/top-tabs';

const BottomTabsNavigator = createBottomTabNavigator<BottomTabsParamsList>();

const BottomTabs = () => {
  return (
    <BottomTabsNavigator.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <BottomTabsNavigator.Screen
        name="trips"
        component={Trips}
        options={{
          title: 'Выезды',
          tabBarIcon: props => (
            <TabBarIcon
              Icon={Home}
              focused={props.focused}
            />
          ),
        }}
      />
      <BottomTabsNavigator.Screen
        name="trips-map"
        component={TripsMap}
        options={{
          headerTransparent: true,
          title: '',
          tabBarIcon: props => (
            <TabBarIcon
              Icon={Map}
              focused={props.focused}
            />
          ),
        }}
      />
      <BottomTabsNavigator.Screen
        name="constuctor"
        component={TopTabs}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <TabBarIcon
              Icon={Wrench}
              focused={props.focused}
            />
          ),
        }}
      />
      <BottomTabsNavigator.Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Профиль',
          tabBarIcon: props => (
            <TabBarIcon
              Icon={User}
              focused={props.focused}
            />
          ),
        }}
      />
    </BottomTabsNavigator.Navigator>
  );
};

export default BottomTabs;
