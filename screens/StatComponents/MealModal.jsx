// MealModal.js
import React, {useState} from 'react';
import {
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const MealModal = ({isVisible, onAddMeal, onClose}) => {
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');

  const handleAddPress = () => {
    if (mealName.trim() && mealCalories) {
      onAddMeal(mealName.trim(), parseInt(mealCalories, 10));
      setMealName('');
      setMealCalories('');
    }
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TextInput
            value={mealName}
            onChangeText={setMealName}
            placeholder="Meal name"
            style={styles.input}
            autoFocus
          />
          <TextInput
            value={mealCalories}
            onChangeText={setMealCalories}
            placeholder="Calories"
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity style={styles.button} onPress={handleAddPress}>
              <Text style={styles.buttonText}>Add Meal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowRadius: 8,
    elevation: 10,
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
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
    backgroundColor: '#C3F4C5',
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

export default MealModal;
