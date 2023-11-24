import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeCaloriesSummary = ({ goal, food, exercise }) => {
  const remaining = goal - food + exercise;

  return (
    <View>
      <Text style={styles.headerText}>Daily calories</Text>
    <View style={styles.summaryContainer}>
      <View style={styles.caloriesContainer}>
        <View style={styles.caloriesItem}>
          <Text style={styles.caloriesValue}>{goal}</Text>
          <Text style={styles.caloriesLabel}>Goal</Text>
        </View>

        <Text style={styles.caloriesText}> - </Text>

        <View style={styles.caloriesItem}>
          <Text style={styles.caloriesValue}>{food}</Text>
          <Text style={styles.caloriesLabel}>Food</Text>
        </View>

        <Text style={styles.caloriesText}> + </Text>

        <View style={styles.caloriesItem}>
          <Text style={styles.caloriesValue}>{exercise}</Text>
          <Text style={styles.caloriesLabel}>Exercise</Text>
        </View>

        <Text style={styles.caloriesText}> = </Text>

        <View style={styles.caloriesItem}>
          <Text style={styles.caloriesValue}>{remaining}</Text>
          <Text style={styles.caloriesLabel}>Remaining</Text>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 16,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 20,


  },
  caloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
  },
  caloriesItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  caloriesValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caloriesLabel: {
    fontSize: 16,
  },
  caloriesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 7, // Adjust space between the elements
  },
});

export default HomeCaloriesSummary;
