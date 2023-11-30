import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkoutModal from './HomeComponents/WorkoutModal'; // Ensure this path is correct

import {saveData, retrieveData} from '../Components/DataViewer';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);

  const [totalFoodCalories, setTotalFoodCalories] = useState(0);
  const [exerciseCalories, setExerciseCalories] = useState(0);
  // Retrieve the data from route parameters or use default values

  const [calorieGoal, setCalorieGoal] = useState(2053);
  // Should I apply the data-saver here as well?

  const totalCaloriesIncludingExercise = calorieGoal + exerciseCalories;

  //Use effect may be causing an error, but is necessary for the function of the program

  useEffect(async () => {
    const retrievingData = async () => {
      const newCalories = await retrieveData('totalCalories');
      if (newCalories) setTotalFoodCalories(parseInt(newCalories, 10));
      else setTotalFoodCalories(0); //here
    };
    const retrievingData2 = async () => {
      const newBurntCalories = await retrieveData('burntCalories');
      if (newBurntCalories) setExerciseCalories(parseInt(newBurntCalories, 10));
      else setExerciseCalories(0); //here
    };
    const theCalorieGoal = async () => {
      const theCalorieTarget = await retrieveData('target');
      if (theCalorieTarget) setCalorieGoal(theCalorieTarget);
    };
    const intervalId = setInterval(() => {
      theCalorieGoal();
      retrievingData();
      retrievingData2();
    }, 10000);
    //This clears the calorie information everytime the app restarts
    await saveData('burntCalories', 0);
    await saveData('totalCalories', 0);
    retrievingData();
    retrievingData2();

    return () => clearInterval(intervalId);
  }, []);

  // Calculate the widths of the progress bar segments
  const foodWidth =
    (totalFoodCalories / totalCaloriesIncludingExercise) * (screenWidth - 40);
  const exerciseWidth =
    (exerciseCalories / totalCaloriesIncludingExercise) * (screenWidth - 40);
  const remainingWidth = screenWidth - 40 - foodWidth - exerciseWidth;

  const handleWorkoutSubmit = (name, calories) => {
    setWorkoutData([...workoutData, {name, calories}]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.subHeader}>Calorie Intake</Text>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFilled, {width: foodWidth}]} />
          <View style={[styles.progressBarExercise, {width: exerciseWidth}]} />
          <View
            style={[styles.progressBarRemaining, {width: remainingWidth}]}
          />
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            <MaterialCommunityIcons
              name="flag-variant"
              size={30}
              color="#BDBDBD"
            />
            Base Goal: {calorieGoal}
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

        <TouchableOpacity
          style={styles.logWorkoutButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.logWorkoutButtonText}>Log Workout</Text>
        </TouchableOpacity>

        {/* Displaying the workout data */}
        {workoutData.map((workout, index) => (
          <View key={index} style={styles.workoutInfo}>
            <Text style={styles.workoutInfoText}>Workout: {workout.name}</Text>
            <Text style={styles.workoutInfoText}>
              Calories Burnt: {workout.calories}
            </Text>
          </View>
        ))}

        {/* Workout Modal */}
        <WorkoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSubmit={handleWorkoutSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginTop: 15,
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 25,
    width: screenWidth - 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    marginTop: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressBarFilled: {
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
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
    backgroundColor: '#10ac84',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 15,
  },
  logWorkoutButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutInfo: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
  },
  workoutInfoText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;
