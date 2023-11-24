import React, {useState} from 'react';
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

const StatsScreen = ({route}) => {
  const {gender, weight, height, age, activityLevel, goal} = route.params;
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

  const totalFoodCalories = Object.values(meals)
    .flat()
    .reduce((acc, meal) => acc + meal.calories, 0);
  const calorieGoal = calculateCalorieGoal();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <DailyCaloriesSummary
          goal={calorieGoal.toFixed(0)}
          food={totalFoodCalories}
          exercise={0}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2', // or your preferred background color
  },
  container: {
    flex: 1,
  },
  // Add more styles as needed
});

export default StatsScreen;
