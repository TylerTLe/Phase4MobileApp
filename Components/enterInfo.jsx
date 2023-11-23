import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { saveData, retrieveData } from './DataViewer';

const UserInputComponent = () => {
  const [heightValue, setHeightValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const RMRvalue = 0
  //might want a button to switch between meters and feet and lb and kg

  const setupLoad = () => {
    //Load the varibles
  }

  const handleInputChange = (value, setStateFunction) => {
    setStateFunction(value);
  };

  const handleSubmit = () => {
    // Perform validation or additional logic as needed
    if (!heightValue || !weightValue || !ageValue) {
      alert('Please fill in all fields');
      return;
    }

    //Save using asnyc storage
    saveData("height", heightValue)
    saveData("weight", weightValue)
    saveData("age", ageValue)
    saveData("gender", selectedGender)

    RMRvalue = RMR(weightValue, heightValue, ageValue, selectedGender);
  };

  return (
    <View style={styles.container}>
      <Text>Height</Text>      
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Enter height"
        value={heightValue}
        onChangeText={(text) => handleInputChange(text, setHeightValue)}
      />
      <Text>Weight</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Enter weight"
        value={weightValue}
        onChangeText={(text) => handleInputChange(text, setWeightValue)}
      />

      

      <Text>Age </Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Enter age"
        value={ageValue}
        onChangeText={(text) => handleInputChange(text, setAgeValue)}
      />
      <Text>Gender</Text>
      <Picker
        selectedValue={selectedGender}
        onValueChange={(Gvalue) => setSelectedGender(Gvalue)}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />

      
      <Picker
        selectedValue={activityLevel}
        onValueChange={(value) => setActivityLevel(value)}>
        <Picker.Item label="No or very little excurcise" value="1" />
        <Picker.Item label="Excercise Once or twice a week" value="2" />
        <Picker.Item label="Excercising a few times a week" value="3" />
        <Picker.Item label="Excercising everyday of the week" value="4" />
      </Picker>

      <Text>{RMRvalue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default UserInputComponent;
