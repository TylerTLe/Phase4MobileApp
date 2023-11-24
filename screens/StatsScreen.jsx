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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <DailyCaloriesSummary
          goal={calorieGoal.toFixed(0)}
          food={totalFoodCalories}
          exercise={0}
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
          onAddMeal={(name, calories) => {
            addMeal(name, calories);
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
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
  // Add more styles as needed
});

export default StatsScreen;
