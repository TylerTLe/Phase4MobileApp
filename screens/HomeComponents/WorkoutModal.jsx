import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const WorkoutModal = ({modalVisible, setModalVisible, onSubmit}) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutCalories, setWorkoutCalories] = useState('');

  const handleSubmit = () => {
    const calories = parseInt(workoutCalories) || 0;
    onSubmit(workoutName, calories);
    setModalVisible(false);
    setWorkoutName('');
    setWorkoutCalories('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
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
          <TouchableOpacity style={styles.buttonClose} onPress={handleSubmit}>
            <Text style={styles.textStyle}>Submit Workout</Text>
          </TouchableOpacity>
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
    marginTop: 22,
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
  buttonClose: {
    backgroundColor: '#10ac84',
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WorkoutModal;
