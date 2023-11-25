import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {VictoryPie, VictoryLegend} from 'victory-native';
import Svg from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({route}) => {
  // Retrieve the data from route parameters or use default values
  const {calorieGoal, totalFoodCalories} = route.params || {
    calorieGoal: calorieGoal,
    totalFoodCalories: totalFoodCalories,
  };

  // Calculate remaining calories
  const remainingCalories = calorieGoal - totalFoodCalories - remainingCalories;

  // Chart data
  const data = [
    {x: 'Base Goal', y: parseInt(calorieGoal) || 1 },
    {x: 'Food', y: totalFoodCalories || 1},
    {x: 'Exercise', y: 100}, // TODO: Replace with actual exercise calories
    {x: 'Remaining', y: totalFoodCalories - remainingCalories || 1},
  ];
  // Colors for each section in the chart
  const colorScale = ['#64B5F6', '#FFB74D', '#4DB6AC', '#e0e0e0'];

  return (
    <View style={styles.container}>
      <Svg width={screenWidth - 40} height={300}>
        <VictoryPie
          standalone={false} // Android workaround: use with nested SVG
          data={data}
          innerRadius={70}
          width={screenWidth - 40}
          height={300}
          colorScale={colorScale}
          padAngle={({datum}) => 2}
        />
      </Svg>

      {/* Render the legend separately with labels */}
      <View style={styles.legend}>
        {data.map((datum, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendIcon, {backgroundColor: colorScale[index]}]}
            />
            <Text style={styles.legendLabel}>{`${datum.y} ${datum.x}`}</Text>
          </View>
        ))}
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
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // Allow items to wrap to next line if space is insufficient
    marginTop: -10, // Adjust this value as needed to bring closer to pie chart
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10, // Add bottom margin for spacing between lines if wrapped
  },
  legendIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  legendLabel: {
    fontSize: 14,
  },
  logWorkoutButton: {
    backgroundColor: '#10ac84',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    width: screenWidth - 40,
    alignItems: 'center',
  },
  logWorkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
