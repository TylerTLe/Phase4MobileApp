import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DailyCaloriesSummary from './StatComponents/DailyCaloriesSummary';


const StatsScreen = ({ route, navigation }) => {
  const { age, height, weight, gender, activityLevel, goal } = route.params;

  // BMR Calculation
  const calculateBMR = () => {
    if (gender === 'male') {
      return 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
    } else {
      return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }
  };

  // Activity Multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  // AMR Calculation
  const calculateAMR = bmr => {
    return bmr * activityMultipliers[activityLevel];
  };

  const bmr = calculateBMR();
  const amr = calculateAMR(bmr);

  // Calorie Goal Calculation
  const calculateCalorieGoal = () => {
    switch (goal) {
      case 'lose_weight':
        // Assuming a standard deficit for weight loss (e.g., 500 kcal/day)
        return amr - 500;
      case 'gain_muscle':
        // Assuming a surplus for muscle gain (e.g., 500 kcal/day)
        return amr + 500;
      case 'maintain_weight':
        // Maintain current weight
        return amr;
      default:
        return amr;
    }
  };

  const calorieGoal = calculateCalorieGoal();

  return (
    <View style={styles.container}>
      <DailyCaloriesSummary goal={calorieGoal.toFixed(0)} food={0} exercise={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default StatsScreen;
