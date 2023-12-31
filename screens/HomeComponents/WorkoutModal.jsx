import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import {saveData, retrieveData} from '../../Components/DataViewer';
import { truncate } from 'fs/promises';

const WorkoutModal = ({isVisible, onSubmit, onClose}) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutCalories, setWorkoutCalories] = useState('');

  const handleSubmit = () => {
    // Check if both workoutName and workoutCalories are provided
    if (workoutName.trim() && workoutCalories.trim()) {
      const calories = parseInt(workoutCalories) || 0;
      onSubmit(workoutName, calories);
      setWorkoutName('');
      setWorkoutCalories('');
      Saving();
      onClose();
    } else {
      // Show an alert if either field is empty
      Alert.alert(
        'Error',
        'Please enter both a workout name and calories burned.',
      );
    }
  };

  const Saving = async () => {
    try {
      // Retrieve and parse the current total calories
      let current = await retrieveData('burntCalories');

      current = parseInt(current, 10);
      current = isNaN(current) ? 0 : current;

      if (current === null || current === 0) {
        // If current is null or 0, initialize it with mealCalories
        saveData('burntCalories', String(parseInt(workoutCalories, 10)));
      } else {
        // If current is not null, add mealCalories to it
        const newTotalCalories = String(
          current + parseInt(workoutCalories, 10),
        );
        saveData('burntCalories', newTotalCalories);
      }

      // Retrieve and display the updated total calories
      const updatedTotalCalories = await retrieveData('burntCalories');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Workout Name"
            style={styles.input}
            onChangeText={setWorkoutName}
            value={workoutName}
          />
          <TextInput
            placeholder="Calories Burnt"
            style={styles.input}
            onChangeText={setWorkoutCalories}
            value={workoutCalories}
            keyboardType="numeric"
          />
           <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Workout</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10ac84',
    padding: 10,
    borderRadius: 5,
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonSpacer: {
    width: 10, // Margin between buttons
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WorkoutModal;
