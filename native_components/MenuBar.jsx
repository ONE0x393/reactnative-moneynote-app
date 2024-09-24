// native_components/Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window'); // 화면의 넓이

const MenuBar = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };
  const images = [
    require('../assets/icon_iamge/main.png'),
    require('../assets/icon_iamge/login.png'),
    require('../assets/icon_iamge/money.png'),
    require('../assets/icon_iamge/account.png'),
    require('../assets/icon_iamge/piechart.png'),
  ];
  // 각 버튼이 이동할 페이지 이름
  const pages = ['Main', 'Login', 'MoneyChange', 'AccountList', 'PayChart'];

  return (
    <View style={styles.container}>
       {images.map((image, index) => {
        return(
          <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(pages[index])} // 각 버튼 클릭 시 페이지 이동
          style={styles.button}
        >
          <Image source={image} style={styles.image} />
        </TouchableOpacity>
        )
        })}
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
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MenuBar;
