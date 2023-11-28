import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

//To save and retrieve basic data
import { saveData, retrieveData } from '../Components/DataViewer';
import { useEffect } from 'react';


const ProfileScreen = () => {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [gender, setGender] = useState('female'); // Default to female

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

    // Adjust calories based on user's goal (lose, gain, maintain)
    let calculatedCalories = bmr;
    if (goal === 'lose') {
      calculatedCalories -= 500; // Example: Create a calorie deficit for weight loss
    } else if (goal === 'gain') {
      calculatedCalories += 500; // Example: Create a calorie surplus for weight gain
    }

    // Adjust calories based on activity level (modify as needed)
    if (activityLevel === 'sedentary') {
      calculatedCalories *= 1.2; // Example adjustment for sedentary activity level
    } else if (activityLevel === 'lightly_active') {
      calculatedCalories *= 1.375; // Example adjustment for lightly active
    } else if (activityLevel === 'moderately_active') {
      calculatedCalories *= 1.55; // Example adjustment for moderately active
    } else if (activityLevel === 'very_active') {
      calculatedCalories *= 1.725; // Example adjustment for very active
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
      <Text style={styles.label}>Enter your information:</Text>

      <TextInput
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={text => setHeight(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={text => setAge(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={text => setWeight(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Select your gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={itemValue => setGender(itemValue)}
        style={styles.input}>
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Male" value="male" />
        {/* Add other gender options as needed */}
      </Picker>

      <Text style={styles.label}>Select your activity level:</Text>
      <Picker
        selectedValue={activityLevel}
        onValueChange={itemValue => setActivityLevel(itemValue)}
        style={styles.input}>
        <Picker.Item label="Sedentary" value="sedentary" />
        <Picker.Item label="Lightly active" value="lightly_active" />
        <Picker.Item label="Moderately active" value="moderately_active" />
        <Picker.Item label="Very active" value="very_active" />
      </Picker>

      <Text style={styles.label}>Select your goal:</Text>
      <Picker
        selectedValue={goal}
        onValueChange={itemValue => setGoal(itemValue)}
        style={styles.input}>
        <Picker.Item label="Maintain weight" value="maintain" />
        <Picker.Item label="Lose weight" value="lose" />
        <Picker.Item label="Gain weight" value="gain" />
      </Picker>

      <Button title="Calculate Calories" onPress={calculateCalories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ProfileScreen;
