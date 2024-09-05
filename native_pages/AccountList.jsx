import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MoneyChangeButton from '../native_components/MoneyChangeButton'; 
import PlusButton from '../native_components/PlusButton'; 
import AccountButton from '../native_components/AccountButton';

const AccountList = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AccountButton
          account="빨강이 좋겠어(롯데카드)"
          content="집주인 월세"
          amount="$300"
        />
        <AccountButton
          account="신한카드"
          content="알바 수당"
          amount="$200"
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
});

export default AccountList;
