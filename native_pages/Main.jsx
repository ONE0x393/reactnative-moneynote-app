import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomCalendar from '../native_components/CustomCalendar'; // 달력 컴포넌트
import EI_View from '../native_components/EI_View'; // 지출 및 수익 컴포넌트
import MonthPayBar from '../native_components/MonthPayBar'; // 막대 그래프 컴포넌트

const Main = () => {
  // 12개월 동안의 데이터 (모두 50으로 설정)
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
    '2024-09-25': {
      expenses: 50000,
      income: 2550000,
    },
    // 더 많은 날짜 추가 가능...
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 지출 및 수익 컴포넌트 */}
      <EI_View expenses="200,000" income="540,000" />
      {/* 달력 컴포넌트 */}
      <CustomCalendar calendarData={calendarData} />
      {/* 12개월 막대 그래프 컴포넌트 */}
      <MonthPayBar data={monthlyData} />
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
