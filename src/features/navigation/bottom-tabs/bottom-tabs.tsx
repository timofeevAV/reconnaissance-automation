import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Trips, TripsMap, Profile } from '@/pages';
import { TabBarIcon } from '@/features/ui';
import { Home, Map, User } from '@tamagui/lucide-icons';
import { BottomTabsParamsList } from './types/bottom-tabs-params-list';

const BottomTabs = createBottomTabNavigator<BottomTabsParamsList>();

const Tabs = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <BottomTabs.Screen
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
      <BottomTabs.Screen
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
      <BottomTabs.Screen
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
    </BottomTabs.Navigator>
  );
};

export default Tabs;
