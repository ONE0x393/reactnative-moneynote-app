// native_components/Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // 화면의 넓이

const MenuBar = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {['Main', 'Login', 'MoneyChange', 'AccountList', 'PayChart'].map((screen, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleNavigation(screen)}
        >
          <Text style={styles.buttonText}>{screen}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    height: 60,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MenuBar;
