import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const MealsScreen = ({ navigation })  =>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Meals</Text>
          <Button 
            title='Click Here'
            onPress={() => alert('Button Clicked!')}
          />
        </View>
      );
    }

    export default MealsScreen;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent:'center',
        },
      });