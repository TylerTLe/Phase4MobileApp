import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { retrieveData } from '../Components/DataViewer';

const StatsScreen = ({ navigation })  =>{
  const calories = retrieveData("calories")

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>STATS!</Text>
          <Button 
            title='Click Here'
            onPress={() => alert('Button Clicked!')}
          />
        </View>
      );
    }

    export default StatsScreen;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent:'center',
        },
      });