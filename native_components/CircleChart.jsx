import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const CircleChart = ({ month, in_output, category, volume }) => {
  // Pie chart data preparation
  const data = category.map((cat, index) => ({
    name: `${cat} `,
    population: isNaN(parseFloat(volume[index])) ? 0 : parseFloat(volume[index]),
    color: ['#EB6927', '#2D8CFF', '#8DB600', '#FFCC66', '#990033'][index % 5],
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{month}월 {in_output}</Text>
      <PieChart
        data={data}
        width={screenWidth - 40}  // Padding to avoid overflow
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForLabels: {
            fontWeight: 'bold'
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="5"
        hasLegend={true}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'column', // Stack charts vertically
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
    fontWeight: 'bold',
  },
});

export default CircleChart;