import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { saveData, retrieveData } from '../Components/DataViewer';
import { useEffect } from 'react';


const ProfileScreen = ({navigation}) => {
  const [height, setHeight] = useState('');

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('lose_weight');


  const validateInput = () => {
    if (!age || !height || !weight) {
      Alert.alert('Error', 'Please fill in all fields.');
      return false;

  useEffect( () => {
    const retrieve = async () => {
      try{
      const storedHeight = await retrieveData('height');
      const storedAge = await retrieveData('age');
      const storedWeight = await retrieveData('weight');
      const storedActivity = await retrieveData('activity');
      const storedGoal = await retrieveData('goal');
      const storedGender = await retrieveData('gender');

      // Update state with the retrieved data, the if make sure that there is an actual value there, and then updates
      if (storedHeight) setHeight(storedHeight);
      if (storedAge) setAge(storedAge);
      if (storedWeight) setWeight(storedWeight);
      if (storedActivity) setWeight(storedActivity);
      if (storedGoal) setWeight(storedGoal);
      if (storedGender) setWeight(storedGender);
      }catch{
        console.error('Error retrieving data: ', error);
      }
    };
  
    retrieve()
  }, []);

  const calculateCalories = () => {
    // Convert height from cm to meters
    const heightInMeters = parseFloat(height) / 100;

    // Perform calorie calculation based on user inputs and gender
    let bmr;
    if (gender === 'female') {
      bmr =
        655 +
        9.6 * parseFloat(weight) +
        1.8 * parseFloat(heightInMeters) -
        4.7 * parseFloat(age);
    } else if (gender === 'male') {
      bmr =
        66 +
        13.7 * parseFloat(weight) +
        5 * parseFloat(heightInMeters) -
        6.8 * parseFloat(age);
    } else {
      // Handle other gender options if needed
      bmr = 0; // Placeholder value

    }
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      Alert.alert('Error', 'Age, height, and weight must be numbers.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateInput()) {
      // Navigate to StatsScreen with the user's profile data
      navigation.navigate('Stats', {
        age: parseInt(age, 10),
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        gender: gender,
        activityLevel: activityLevel,
        goal: goal,
      });
    }

    // Display the calculated calories or perform further actions here
    alert(
      `Your daily calorie needs: ${calculatedCalories.toFixed(2)} calories`,
    );


    saveData('height', height)
    saveData('weight', weight)
    saveData('age', age)
    saveData('goal', goal)
    saveData('activity', activityLevel)
    saveData('gender', gender)
    saveData('calories', calculatedCalories)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Age (years)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
        placeholder="Enter your age"
      />

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setHeight}
        value={height}
        keyboardType="numeric"
        placeholder="Enter your height"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        keyboardType="numeric"
        placeholder="Enter your weight"
      />

      <Text style={styles.label}>Gender</Text>
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={itemValue => setGender(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text style={styles.label}>Activity Level</Text>
      <Picker
        selectedValue={activityLevel}
        style={styles.picker}
        onValueChange={itemValue => setActivityLevel(itemValue)}>
        <Picker.Item label="Sedentary" value="sedentary" />
        <Picker.Item label="Lightly Active" value="lightly_active" />
        <Picker.Item label="Moderately Active" value="moderately_active" />
        <Picker.Item label="Active" value="active" />
        <Picker.Item label="Very Active" value="very_active" />
      </Picker>

      <Text style={styles.label}>Goal</Text>
      <Picker
        selectedValue={goal}
        style={styles.picker}
        onValueChange={itemValue => setGoal(itemValue)}>
        <Picker.Item label="Lose Weight" value="lose_weight" />
        <Picker.Item label="Gain Muscle" value="gain_muscle" />
        <Picker.Item label="Maintain Weight" value="maintain_weight" />
      </Picker>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#10ac84',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#000', // White color for the text of the button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;