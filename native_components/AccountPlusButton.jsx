import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 페이지 이동을 위해 추가

const AccountPlusButton = () => {
  const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옵니다

  const handlePress = () => {
    navigation.navigate('AccountEdit'); 
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60, // 버튼의 가로 넓이
    height: 60, // 버튼의 높이
    borderRadius: 40, // 동그란 모양을 만들기 위한 설정
    backgroundColor: '#87CEEB', // 하늘색 배경
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
    position: 'absolute', // 절대 위치
    bottom: 20, // 페이지의 하단에서 20 단위 위로
    right: 20, // 페이지의 우측에서 20 단위 떨어진 위치
  },
  text: {
    fontSize: 70, // '+' 기호의 크기
    color: '#fff', // 하얀색 텍스트
    marginTop: -15, // 버튼 내에서 '+' 기호를 위로 이동
  },
});

export default AccountPlusButton;
