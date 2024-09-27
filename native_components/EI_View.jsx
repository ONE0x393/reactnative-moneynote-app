// native_components/EI_View.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EI_View = ({ expenses, income }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.summaryBox, styles.expensesBox]}>
        <Text style={styles.text}>지출: {expenses} 원</Text>
      </View>
      <View style={[styles.summaryBox, styles.incomeBox]}>
        <Text style={styles.text}>수익: {income} 원</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 가로로 나열
    justifyContent: 'space-between', // 양 끝으로 배치
    marginBottom: 20, // 달력 상단에 간격 추가
  },
  summaryBox: {
    flex: 1, // 각 박스가 균등하게 공간을 차지하도록 설정
    marginHorizontal: 10, // 박스 간의 간격 추가
    marginVertical: 10, // 위아래 간격 추가
    paddingVertical: 20, // 위아래 패딩 추가
    paddingHorizontal: 10,
    borderRadius: 20, // 둥근 테두리
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  expensesBox: {
    backgroundColor: '#FF6F6F', // 지출은 빨강
  },
  incomeBox: {
    backgroundColor: '#6F8CFF', // 수익은 파랑
  },
});

export default EI_View;
