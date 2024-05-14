import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Trips, TripsMap, Profile } from '@/pages';
import { TabBarIcon } from '@/features/ui';
import { Home, Map, User } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';
import { BottomTabsParamsList } from './types/bottom-tabs-params-list';

const BottomTabs = createBottomTabNavigator<BottomTabsParamsList>();

const Tabs = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          android: {
            position: undefined,
            borderTopLeftRadius: undefined,
            borderTopRightRadius: undefined,
          },
        }),
        tabBarBackground: () =>
          Platform.select({
            ios: (
              <BlurView
                intensity={80}
                tint={'regular'}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                }}
              />
            ),
            android: undefined,
          }),
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
