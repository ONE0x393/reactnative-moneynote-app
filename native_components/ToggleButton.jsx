import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

function ToggleButtonGroup({ options, selectedOption, onChange }) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.toggleButton,
            selectedOption === option && styles.selectedButton
          ]}
          onPress={() => onChange(option)}
        >
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default ToggleButtonGroup;