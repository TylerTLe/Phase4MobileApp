import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({route}) => {
  // Default values are set for initial state when no data is passed
  const defaultData = {
    progressData: [0, 0, 0, 1], // Example default data for progress chart
    weightData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // Example default labels for weight chart
      data: [0, 0, 0, 0, 0], // Example default data for weight chart
    },
  };

  // Retrieve userData from route parameters or use default data
  const userData = route.params?.userData || defaultData;

  const chartConfig = {
    backgroundGradientFrom: '#08130D',
    backgroundGradientTo: '#1E2923',
    decimalPlaces: 2, // specify the number of decimal places
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
      paddingRight: 30, // Add padding to prevent cutting off of text
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const progressChartData = {
    labels: ['Goal', 'Food', 'Exercise', 'Remaining'],
    data: userData.progressData,
  };

  const weightData = {
    labels: userData.weightData.labels,
    datasets: [
      {
        data: userData.weightData.data,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Placeholder for a function to log workout calories
  const handleLogWorkout = () => {
    // Placeholder functionality - to be implemented
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <ProgressChart
          data={progressChartData}
          width={screenWidth - 40} // Adjust the width by subtracting the horizontal padding
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={weightData}
          width={screenWidth - 40} // Adjust the width by subtracting the horizontal padding
          height={256}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <TouchableOpacity
        style={styles.logWorkoutButton}
        onPress={handleLogWorkout}>
        <Text style={styles.logWorkoutButtonText}>Log Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  chartContainer: {
    alignItems: 'center', // Center chart within the container
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center', // Center chart within the container
  },
  logWorkoutButton: {
    backgroundColor: '#10ac84',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  logWorkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
