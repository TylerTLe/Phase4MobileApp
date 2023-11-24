import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import HomeCaloriesSummary from './HomeComponents/HomeCaloriesSummary';
const HomeScreen = ({navigation}) => {
  return (
    <View>
      <HomeCaloriesSummary/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
