// MealModal.js
import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet } from 'react-native';

const MealModal = ({ isVisible, onAddMeal, onClose }) => {
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
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
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
          <Button title="Add Meal" onPress={handleAddPress} />
          <Button title="Close" onPress={onClose} />
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
});

export default MealModal;
