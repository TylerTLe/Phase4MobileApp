import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { saveData, retrieveData } from '../Components/DataViewer';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({route}) => {
  // Retrieve the data from route parameters or use default values
  const [totalFoodCalories, setTotalFoodCalories] = useState(100);

  const {calorieGoal, exerciseCalories} = route.params || {
    calorieGoal: 2000,
    exerciseCalories: 100,
  };

  const totalCaloriesIncludingExercise = calorieGoal + exerciseCalories;

  //Use effect may be cauing an error, but is necessary for the function of the program

  useEffect(() => {
    const retrievingData = async () => {
      const newCalories = await retrieveData('totalCalories');
      if(newCalories) setTotalFoodCalories(newCalories)
    };
    const intervalId = setInterval(() => {
      retrievingData();
    }, 5000);
    retrievingData();

    return () => clearInterval(intervalId);
  }, []);

  // Calculate the widths of the progress bar segments
  const foodWidth =
    (totalFoodCalories / totalCaloriesIncludingExercise) * (screenWidth - 40);
  const exerciseWidth =
    (exerciseCalories / totalCaloriesIncludingExercise) * (screenWidth - 40);
  const remainingWidth = screenWidth - 40 - foodWidth - exerciseWidth;

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Calorie Intake</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFilled, {width: foodWidth}]} />
        <View style={[styles.progressBarExercise, {width: exerciseWidth}]} />
        <View style={[styles.progressBarRemaining, {width: remainingWidth}]} />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          <MaterialCommunityIcons
            name="flag-variant"
            size={30}
            color="#BDBDBD"
          />
          Base Goal:
          {calorieGoal}
        </Text>
        <Text style={styles.statsText}>
          <MaterialCommunityIcons
            name="food-fork-drink"
            size={30}
            color="#4CAF50"
          />{' '}
          {totalFoodCalories} kcal
        </Text>
        <Text style={styles.statsText}>
          <MaterialCommunityIcons name="fire" size={30} color="#FFC107" />{' '}
          {exerciseCalories} Calories Burnt
        </Text>
        <Text style={styles.statsText}>
          Calories Remaining:{' '}
          {calorieGoal - totalFoodCalories + exerciseCalories} Calories
        </Text>
      </View>

      <TouchableOpacity style={styles.logWorkoutButton} onPress={() => {}}>
        <Text style={styles.logWorkoutButtonText}>Log Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF', // Using white for a clean look
  },
  subHeader: {
    fontSize: 20, // Slightly larger for better readability
    fontWeight: '600',
    color: '#212121', // Consistent color scheme for text
    marginTop: 15,
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 25, // Thicker progress bar for a modern look
    width: screenWidth - 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 15, // More rounded corners
    marginTop: 20,
    overflow: 'hidden',
    shadowColor: '#000', // Shadow for depth
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressBarFilled: {
    backgroundColor: '#4CAF50', // Keeping vibrant colors for visual appeal
  },
  progressBarExercise: {
    backgroundColor: '#FFC107',
  },
  progressBarRemaining: {
    backgroundColor: '#BDBDBD',
  },
  statsContainer: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light gray card background
    padding: 10,
    borderRadius: 10, // Rounded corners for card
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  statsText: {
    fontSize: 16,
    color: '#212121',
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 4,
  },
  logWorkoutButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 25,
    padding: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 60,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logWorkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
