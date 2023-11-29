import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { saveData, clearAllData } from '../Components/DataViewer';

const SettingsScreen = () => {
  const handleButtonPress = () => {
    Alert.alert('This button does nothing');
  };

  const clearData = () => {
    clearAllData()
    Alert.alert('All infromation cleared');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Example settings options */}
      <TouchableOpacity style={styles.option} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>My Info</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Accounts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Import</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Export</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={clearData}>
        <Text style={styles.buttonText}>Delete data</Text>
      </TouchableOpacity>

      {/* Add more settings options as needed */}
    </View>
  );
};

//Experimental delete button, it seems to break the app
/*
<TouchableOpacity style={styles.option} onPress={clearData}>
        <Text style={styles.buttonText}>Delete data</Text>
      </TouchableOpacity>
*/

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
