import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = ({ navigation })  =>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home</Text>
          <Button 
            title='Click Here'
            onPress={() => alert('Button Clicked!')}
          />
        </View>
      );
    }

    export default HomeScreen;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent:'center',
        },
      });