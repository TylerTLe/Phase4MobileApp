/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatsScreen from './screens/StatsScreen';
import MealsScreen from './screens/MealsScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {

        }
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="Stats" component={StatsScreen}></Tab.Screen>
        <Tab.Screen name="Meals" component={MealsScreen}></Tab.Screen>
        <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
  },
});
