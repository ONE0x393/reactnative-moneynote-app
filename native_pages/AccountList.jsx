import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AccountPlusButton from '../native_components/AccountPlusButton';
import AsyncStorage from '@react-native-async-storage/async-storage'

function AccountList() {
  const navigation = useNavigation();
  const [groupedAccounts, setGroupedAccounts] = useState({});

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // callFirestore를 사용하여 데이터를 가져오기
        const UID = await AsyncStorage.getItem("UID");
        if (!UID) {
          navigation.navigate("Login");
          return; // 더 이상 실행하지 않도록 return
        }
        const results = await callFirestore.getDataByUID({
          collectionName: 'cards',
          UID:UID,
        });
        calculateBalanceByBankAndAccount(results);
      } catch (error) {
        console.error('계좌 데이터를 가져오는 중 오류 발생: ', error);
      }
    };

    fetchAccounts();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAccounts();
    });
    return () => unsubscribe();
  }, []);

  const calculateBalanceByBankAndAccount = (accountsData) => {
    const groupedData = accountsData.reduce((acc, account) => {
      const bankName = account.bank || '알 수 없는 은행';
      const accountName = account.account || '알 수 없는 계좌';
      const key = `${bankName}-${accountName}`;

      if (!acc[key]) {
        acc[key] = {
          bank: bankName,
          account: accountName,
          in_amount: 0,
          ex_amount: 0,
          balance: 0,
          uid: account.uid,
          transactions: [],
        };
      }

      acc[key].in_amount += account.in_amount || 0;
      acc[key].ex_amount += account.ex_amount || 0;
      acc[key].balance = acc[key].in_amount - acc[key].ex_amount;

      acc[key].transactions.push(account);

      return acc;
    }, {});

    setGroupedAccounts(groupedData);
  };

  const renderBankGroup = ({ item }) => {
    const accountKey = item;
    const accountData = groupedAccounts[accountKey];

    return (
      <TouchableOpacity
        style={styles.bankGroup}
        onPress={() => navigation.navigate('AccountDetail', { accountData })}
      >
        <Text style={styles.bankName}>{accountData.bank} - {accountData.account}</Text>
        <Text style={styles.accountText}>잔액: {Number(accountData.balance).toLocaleString()}원</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>계좌 목록</Text>
      </View>
      <View style={{ padding: 20 }}>
        <FlatList
          data={Object.keys(groupedAccounts)}
          renderItem={renderBankGroup}
          keyExtractor={(item) => item}
        />
      </View>
      <AccountPlusButton onPress={() => navigation.navigate('AccountEdit')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center', // 텍스트가 세로로 가운데 정렬되도록 설정
    alignItems: 'center', // 가로로 가운데 정렬
    backgroundColor: '#f0f0f0', // 배경 색상
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // 하단 경계선 추가
    paddingTop:20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  bankGroup: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
  },
  bankName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AccountList;