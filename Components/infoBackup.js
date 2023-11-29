import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UserInputComponent = ({ onInputSubmit }) => {
  const [heightValue, setHeightValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('Male');

  const handleInputChange = (value, setStateFunction) => {
    setStateFunction(value);
  };

  const handleSubmit = () => {
    // Perform validation or additional logic as needed
    if (!heightValue || !weightValue || !ageValue) {
      alert('Please fill in all fields');
      return;
    }

    // Pass the input values to the parent component
    onInputSubmit({
      height: heightValue,
      weight: weightValue,
      age: ageValue,
      gender: selectedGender,
    });

    // Optionally, you can clear the input fields after submission
    setHeightValue('');
    setWeightValue('');
    setAgeValue('');
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
      <Text>Gender, need to dsiplay</Text>
      <Picker
        selectedValue={selectedGender}
        onValueChange={(Gvalue) => setSelectedGender(Gvalue)}
      >
        
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
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
