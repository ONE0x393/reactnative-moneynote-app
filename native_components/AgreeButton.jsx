import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

function AgreeButton({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>약관 동의 버튼</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AgreeButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});