import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

function ActionButtons({ onSave, onEdit }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onEdit} style={styles.button}>
        <Text style={styles.buttonText}>수정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave} style={styles.button}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default ActionButtons;