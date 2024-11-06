import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomCalendar from '../native_components/CustomCalendar'; // 달력 컴포넌트
import EI_View from '../native_components/EI_View'; // 지출 및 수익 컴포넌트
import MonthPayBar from '../native_components/MonthPayBar'; // 막대 그래프 컴포넌트

const Main = () => {
  // 12개월 동안의 데이터
  const monthlyData = [50, 40, 70, 43, 34, 27, 55, 67, 5, 0, 0, 0]
  const calendarData = {
    '2024-09-05': {
      expenses: 40000,
      income: 300,
    },
    '2024-09-24': {
      expenses: 100000,
      income: 150300,
    },
    '2024-10-25': {
      expenses: 50000,
      income: 255000,
    },
    '2024-10-07': {
      expenses: 43000,
      income: 67000,
    },
    // 더 많은 날짜 추가 가능...
    // 특정 날짜의 총 지출, 수익을 표시하기 위한 값
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 지출 및 수익 컴포넌트 */}
      <EI_View expenses="200,000" income="540,000" />  {/* expenses에 지출, income에 수익을 넣어 상단에 표시 */}
      {/* 달력 컴포넌트 */}
      <CustomCalendar calendarData={calendarData} /> {/* 특정날짜의 총지출,수익 금액에 대한 정보인 calendarData를 전달하여 출력 */}
      {/* 12개월 막대 그래프 컴포넌트 */}
      <MonthPayBar data={monthlyData} /> {/* 월별 지출 금액을 막대 그래프로 표현, 제거고려 */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Main;
