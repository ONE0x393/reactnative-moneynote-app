import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

function AccountEdit() {
  const route = useRoute();
  const navigation = useNavigation();
  const { del_positive = 0, chosenID = "Jeeny doe", item, bank: initialBank = '', account: initialAccount = '' } = route.params || {};

  const [accountId, setID] = useState(chosenID);
  const [type, setType] = useState('income'); // 'income' or 'expense'
  const [inAmount, setInAmount] = useState(0); // 수입 금액
  const [exAmount, setExAmount] = useState(0); // 지출 금액
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
  const [balance, setBalance] = useState(0); // 잔액 상태 추가
  const [UID, setUID] = useState(chosenID);


  let selectMethod = "";

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Firestore에서 데이터를 가져오기 위해 callFirestore 사용
        const uid = await AsyncStorage.getItem("UID");
        setUID(uid);

        const results = await callFirestore.getDataByUID({
          collectionName: 'cards',
          UID: uid
        });
        
        if (results && results.length > 0) {
          const data = results[0];
          setType(data.type === 1 ? 'income' : 'expense');
        } else {
          console.error(`No such document found in the accounts collection for UID: ${uid}`);
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchAccountData();
  }, [UID]);

  const calculateBalance = async () => {
    try {
      // 수입 및 지출 데이터를 가져오기 위해 callFirestore 사용
      const results = await callFirestore.getDataAll({
        collection: 'cards',
      });

      let incomeTotal = 0;
      let expenseTotal = 0;

      results.data.forEach((data) => {
        if (data.type === 1) {
          incomeTotal += data.in_amount; // 수입 합산
        } else if (data.type === 0) {
          expenseTotal += data.ex_amount; // 지출 합산
        }
      });

      return incomeTotal - expenseTotal; // 잔액 반환
    } catch (error) {
      console.error('Error calculating balance:', error);
      return 0;
    }
  };

  const handleSubmit = async () => {
    const formattedType = type === 'income' ? 1 : 0;
    //console.log(UID);
    const data = {
      uid: UID,
      in_amount: formattedType === 1 ? Number(inAmount) : 0,
      ex_amount: formattedType === 0 ? Number(exAmount) : 0,
      account,
      bank,
    };
  
    try {
      let firestorePromise;
      if (selectMethod === "Add") {
        firestorePromise = callFirestore.addData({
          collection: 'cards',
          data: data,
        });
      } 
      else if (selectMethod === "Modify") {
        firestorePromise = callFirestore.updateDatabyDoc({
          collectionName: "cards",
          UID: UID,
          account: account,
          in_amount: data.in_amount,
          ex_amount: data.ex_amount,
          bank: bank,
        });
      } 
      else if (selectMethod === "Del") {
        firestorePromise = callFirestore.deleteDatabyDoc({
          collectionName: "cards",
          UID: UID,
          account: account,
          in_amount: data.in_amount,
          ex_amount: data.ex_amount,
          bank: bank,
        });
      }
  
      // Firestore 작업이 완료된 후
      Promise.resolve(firestorePromise).then(async () => {
        const updatedBalance = await calculateBalance();
        setBalance(updatedBalance);

        navigation.navigate('AccountList', {
          newData: data,  
        });
      }).catch((error) => {
        console.error('Error during Firestore operation: ', error);
      });
    } catch (error) {
      console.error('Error submitting data: ', error);
    }
  };
  
  const handleAdd = () => {
    selectMethod = "Add";
    handleSubmit();
  };
  
  const handleModify = () => {
    selectMethod = "Modify";
    handleSubmit();
  };
  
  const handleDel = () => {
    selectMethod = "Del";
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {accountId ? '계좌 추가' : '계좌 추가'}
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>계좌/카드</Text>
        <TextInput
          style={styles.input}
          value={account}
          onChangeText={setAccount}
          placeholder="계좌 또는 카드 이름 입력"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>은행</Text>
        <TextInput
          style={styles.input}
          value={bank}
          onChangeText={setBank}
          placeholder="은행 이름 입력"
        />
      </View>

      {del_positive !== 1 && (
        <View style={styles.formGroup}>
          <Button title="저장" onPress={handleAdd} />
        </View>
      )}

      {del_positive === 1 && (
        <View style={styles.formGroup}>
          <Button title="수정" onPress={handleModify} />
        </View>
      )}

      {del_positive === 1 && (
        <View style={styles.formGroup}>
          <Button title="삭제" onPress={handleDel} />
        </View>
      )}
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
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
});

export default AccountEdit;