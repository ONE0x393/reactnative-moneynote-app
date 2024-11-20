import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

function AccountDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { accountData } = route.params;

  const [userName, setUserName] = useState('알 수 없는 사용자');

  useEffect(() => {
    console.log('Received Account Data:', accountData);
    const fetchUserID = async () => {
      try {
        // `accountData.uid`가 있는지 확인 후 해당 UID로 사용자 이름을 조회합니다.
        if (accountData?.uid) {
          const name = await callFirestore.getUserNameByUID(accountData.uid);
          setUserName(name);
        } else {
          console.error('UID 정보가 없습니다.');
        }
      } catch (error) {
        console.error('사용자 이름 조회 중 오류 발생:', error);
      }
    };

    fetchUserID();
  }, [accountData]);

  const balance = (Number(accountData.in_amount) || 0) - (Number(accountData.ex_amount) || 0);

  const handleEdit = () => {
    navigation.navigate('AccountEdit', { 
      bank: accountData.bank, 
      account: accountData.account, 
      in_amount: accountData.in_amount,
      ex_amount: accountData.ex_amount,
      chosenID: accountData.uid, 
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "계좌 삭제",
      "정말 이 계좌를 삭제하시겠습니까?",
      [
        {
          text: "아니오",
          style: "cancel"
        },
        {
          text: "예",
          onPress: async () => {
            try {
              await callFirestore.deleteCardbymoney({
                collectionName: 'cards',
                UID: accountData.uid,
                bank: accountData.bank,
                account: accountData.account
              });
              Alert.alert("삭제 완료", "계좌가 삭제되었습니다.");
              navigation.navigate('AccountList');
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert("오류", "계좌 삭제 중 오류가 발생했습니다.");
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userName} 님의 계좌</Text>

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
        <Button title="수정" onPress={handleEdit} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="삭제" color="red" onPress={handleDelete} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="확인" onPress={() => navigation.navigate('AccountList')} />
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
