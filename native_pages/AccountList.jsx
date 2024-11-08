import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MoneyChangeButton from '../native_components/MoneyChangeButton';
import PlusButton from '../native_components/PlusButton';
import AccountButton from '../native_components/AccountButton';

const AccountList = () => {
  const navigation = useNavigation();

  const data_list = [
    { account: "빨강이 좋겠어(롯데카드)", content: "집주인 월세", amount: "300000" },
    { account: "신한카드", content: "알바 수당", amount: "250000" },
    { account: "빨강이 좋겠어(롯데카드)", content: "집주인 월세", amount: "300000" },
    { account: "신한카드", content: "알바 수당", amount: "250000" },
    { account: "빨강이 좋겠어(롯데카드)", content: "집주인 월세", amount: "300000" },
    { account: "신한카드", content: "알바 수당", amount: "250000" },
    { account: "빨강이 좋겠어(롯데카드)", content: "집주인 월세", amount: "300000" },
    { account: "신한카드", content: "알바 수당", amount: "250000" },
    { account: "빨강이 좋겠어(롯데카드)", content: "집주인 월세", amount: "300000" },
    { account: "신한카드", content: "알바 수당", amount: "55550000" },
  ];

  const handlePlusButtonPress = () => {
    navigation.navigate('AccountEdit'); // AccountEdit 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data_list.slice().reverse().map((item, index) => (
          <AccountButton
            key={index}
            account={item.account}
            content={item.content}
            amount={item.amount}
          />
        ))}
      </ScrollView>
      <PlusButton onPress={handlePlusButtonPress} /> {/* PlusButton에 onPress 추가 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default AccountList;