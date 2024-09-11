import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 페이지 이동을 위해 추가

const MoneyChangeButton = ({ date, content, amount, type }) => {
  const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옵니다

  const handlePress = () => {
    navigation.navigate('AccountForm'); // 'Main' 페이지로 이동합니다
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <View style={[styles.line, { backgroundColor: type === 0 ? 'red' : 'blue' }]} />
      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.contentText}>{content}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '70%', // 버튼의 가로 넓이 설정
    height: 80, // 버튼의 높이 설정
    backgroundColor: '#fff', // 버튼의 배경 색상
    flexDirection: 'row', // 가로로 배치
    alignItems: 'center', // 수직 중앙 정렬
    marginVertical: 10, // 상하 여백 추가
    borderRadius: 4, // 모서리 둥글게
    elevation: 2, // 그림자 효과 (안드로이드)
    shadowColor: '#000', // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  line: {
    width: 5, // 세로선의 너비
    height: '100%', // 버튼 높이와 동일하게 설정
    position: 'absolute', // 버튼 왼쪽에 배치
    left: 0,
    top: 0,
  },
  content: {
    flex: 1, // 남은 공간을 차지하도록 설정
    justifyContent: 'center', // 수직 중앙 정렬
    marginLeft: 10, // 세로선과의 여백
  },
  date: {
    fontSize: 19, // 날짜 텍스트 크기
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 17, // 내용 텍스트 크기
    color: '#333',
  },
  amount: {
    fontSize: 16, // 금액 텍스트 크기
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute', // 오른쪽 하단에 위치하도록 설정
    right: 10,
    bottom: 10,
  },
});

export default MoneyChangeButton;
