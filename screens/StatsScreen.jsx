import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DailyCaloriesSummary from './StatComponents/DailyCaloriesSummary';
import MealModal from './StatComponents/MealModal';

import { saveData, retrieveData } from '../Components/DataViewer';

const StatsScreen = ({route, navigation}) => {
  // Default parameters in case route.params is undefined
  const defaultParams = {
    gender: 'male',
    weight: 70,
    height: 170,
    age: 25,
    activityLevel: 'sedentary',
    goal: 'maintain_weight',
  };

  // Use parameters from route.params or default parameters

  // Should I apply the datasaver here as well?
  //const {gender, weight, height, age, activityLevel, goal} =
    //route.params || defaultParams;

  //Defining values, and still using default
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);   
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintain_weight')

  const [meals, setMeals] = useState({breakfast: [], lunch: [], dinner: []});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMealType, setCurrentMealType] = useState(null);

  const calculateBMR = () => {
    if (gender === 'male') {
      return 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
    } else {
      return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }
  };

  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const calculateAMR = bmr => bmr * activityMultipliers[activityLevel];
  const bmr = calculateBMR();
  const amr = calculateAMR(bmr);

  const calculateCalorieGoal = () => {
    switch (goal) {
      case 'lose_weight':
        return amr - 500;
      case 'gain_muscle':
        return amr + 500;
      case 'maintain_weight':
      default:
        return amr;
    }
  };

  const addMeal = (mealName, calories) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [currentMealType]: [
        ...prevMeals[currentMealType],
        {name: mealName, calories},
      ],
    }));
  };

  const totalFoodCalories = Object.values(meals)
    .flat()
    .reduce((acc, meal) => acc + meal.calories, 0);
  const calorieGoal = calculateCalorieGoal();

  const openMealModal = mealType => {
    setCurrentMealType(mealType);
    setModalVisible(true);
    
  };

  const navigateToHome = () => {
    navigation.navigate('Home', {
      calorieGoal: calorieGoal,
      totalFoodCalories: totalFoodCalories,
    });
  };

  const caloriesRemaining = calorieGoal - totalFoodCalories;

  const [burntCalories, setburntCalories] = useState(0);

  useEffect(() => {
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
      if (storedActivity) setActivityLevel(storedActivity);
      if (storedGoal) setGoal(storedGoal);
      if (storedGender) setGender(storedGender);
      }catch{
        console.error('Error retrieving data: ', error);
      }
    };

    const retrievingData = async () => {
      const burntCalories = await retrieveData('burntCalories');
      if(burntCalories) setburntCalories(parseInt(burntCalories, 10))
      else setburntCalories(0);//here
    };

    const caloryGoal = async () => {
      await saveData('target', String(calorieGoal))
      console.log('try')
      console.log(String(calorieGoal))
      const num = await retrieveData('target')
      console.log('re')
      console.log(num)
      console.log(parseInt(num, 10))
    }
    const intervalId = setInterval(() => {
      retrievingData();
      retrieve();
      caloryGoal();
    }, 5000);
    retrievingData();
    retrieve();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
    
      <ScrollView style={styles.container}>
        <DailyCaloriesSummary
          goal={calorieGoal.toFixed(0)}
          food={totalFoodCalories}
          exercise={burntCalories} // manage the exercise state if necessary
        />
        {['breakfast', 'lunch', 'dinner'].map(mealType => (
          <View key={mealType} style={styles.mealSection}>
            <Text style={styles.mealHeader}>{mealType.toUpperCase()}</Text>
            <View style={styles.mealsContainer}>
              {meals[mealType].map((meal, index) => (
                <View key={index} style={styles.mealCard}>
                  <Text>{meal.name}</Text>
                  <Text>{meal.calories} kcal</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openMealModal(mealType)}>
              <Text style={styles.addButtonText}>Add {mealType}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <MealModal
          isVisible={modalVisible}
          onAddMeal={addMeal}
          onClose={() => setModalVisible(false)}
        />
        <TouchableOpacity
          onPress={navigateToHome}
          style={styles.navigateToHomeButton}>
          <Text style={styles.navigateToHomeButtonText}>Go to Home Screen</Text>
        </TouchableOpacity>
      </ScrollView>
              
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
  },
  mealSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  mealHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealsContainer: {
    marginBottom: 10,
  },
  mealCard: {
    backgroundColor: '#C3F4C5',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  addButton: {
    backgroundColor: '#e7e7e7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  navigateToHomeButton: {
    backgroundColor: '#10ac84',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 15,
  },
  navigateToHomeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default StatsScreen;
