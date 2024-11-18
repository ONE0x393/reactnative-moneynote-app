import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

function AccountDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { accountData } = route.params;

  const [userID, setUserID] = useState('Jeeny doe');

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const results = await callFirestore.getDataByUID({
          collectionName: 'cards',
          UID: `${accountData.bank}-${accountData.account}`
        });

        if (results && results.length > 0) {
          setUserID(results[0].uid || '알 수 없는 사용자');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserID();
  }, [accountData]);

  const balance = (Number(accountData.in_amount) || 0) - (Number(accountData.ex_amount) || 0);

  const handleEdit = () => {
    navigation.navigate('AccountList', { bank: accountData.bank, account: accountData.account });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userID} 님의 계좌</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>은행</Text>
        <Text style={styles.sectionValue}>{accountData.bank}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>계좌번호</Text>
        <Text style={styles.sectionValue}>{accountData.account}</Text>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>잔액</Text>
        <Text style={styles.balanceValue}>{balance.toLocaleString()}원</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="확인" onPress={handleEdit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionValue: {
    fontSize: 16,
    marginTop: 5,
  },
  balanceSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
  },
  balanceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AccountDetail;
