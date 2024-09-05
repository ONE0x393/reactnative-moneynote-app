import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MoneyChangeButton from '../native_components/MoneyChangeButton'; // 경로 수정
import PlusButton from '../native_components/PlusButton'; // 경로 추가

const MoneyChange = () => {
  const route = useRoute();
  const { selectedDate } = route.params || {};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>
        )}
        <MoneyChangeButton
          date="2024-09-05"
          content="Sample Content"
          amount="$100"
          type={0} // 0: 빨간색 선, 1: 파란색 선
        />
        <MoneyChangeButton
          date="2024-09-06"
          content="Another Content"
          amount="$200"
          type={1} // 0: 빨간색 선, 1: 파란색 선
        />
        {/* 더 많은 MoneyChangeButton을 추가할 수 있습니다 */}
      </ScrollView>
      <PlusButton /> {/* PlusButton 추가 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 공간을 차지하도록 설정
  },
  scrollContainer: {
    alignItems: 'center', // 자식들을 가로로 중앙에 정렬
    paddingVertical: 10, // 상하 패딩 추가
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MoneyChange;
