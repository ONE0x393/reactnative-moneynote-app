import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

function AccountDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { accountData } = route.params;

  const handleEdit = () => {
    navigation.navigate('AccountEdit', { bank: accountData.bank, account: accountData.account });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{accountData.bank} - {accountData.account}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>수입</Text>
        <Text style={styles.sectionValue}>{Number(accountData.income).toLocaleString()}원</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>지출</Text>
        <Text style={styles.sectionValue}>{Number(accountData.expense).toLocaleString()}원</Text>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>잔액</Text>
        <Text style={styles.balanceValue}>{Number(accountData.balance).toLocaleString()}원</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="수정" onPress={handleEdit} />
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