import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#ffffff'},
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        initialParams={{
          age: 20,
          height: 170,
          weight: 70,
          gender: 'male',
          activityLevel: 'sedentary',
          goal: 'gain_muscle',
        }}
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Welcome back',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="home" size={30} color="black" />
            </Text>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        initialParams={{
          age: 20,
          height: 170,
          weight: 70,
          gender: 'male',
          activityLevel: 'sedentary',
          goal: 'gain_muscle',
        }}
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Daily stats',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="stats-chart" size={30} color="black" />
            </Text>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="person" size={30} color="black" />
            </Text>
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Meals"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="settings" size={30} color="black" />
            </Text>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
