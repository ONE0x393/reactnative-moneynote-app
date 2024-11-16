import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Timestamp } from 'firebase/firestore';

function AccountEdit() {
  const route = useRoute();
  const navigation = useNavigation();
  const { del_positive = 0, chosenID = "Jeeny doe", item, bank: initialBank = '', account: initialAccount = '' } = route.params || {};

  const [accountId, setID] = useState(chosenID);
  const [type, setType] = useState('income'); // 'income' or 'expense'
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(initialAccount);
  const [bank, setBank] = useState(initialBank);
  const [balance, setBalance] = useState(0); // 잔액 상태 추가

  let selectMethod = "";

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchAccountData = async () => {
      if (accountId) {
        try {
          // Firestore에서 데이터를 가져오기 위해 callFirestore 사용
          const results = await callFirestore.getDataByID({
            collectionName: 'accounts',
            ID: accountId
          });
          
          if (results && results.length > 0) {
            const data = results[0];
            setType(data.type === 1 ? 'income' : 'expense');
            setAmount(data.amount.toString());
            setAccount(data.account || initialAccount);
            setBank(data.bank || initialBank);
          } else {
            console.error(`No such document found in the accounts collection for accountId: ${accountId}`);
          }
        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      }
    };

    fetchAccountData();
  }, [accountId]);

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
          incomeTotal += data.amount; // 수입 합산
        } else if (data.type === 0) {
          expenseTotal += data.amount; // 지출 합산
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
    const data = {
      type: formattedType,
      amount: Number(amount),
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
          ID: accountId,
          account: account,
          amount: amount,
          bank: bank,
        });
        data.ID = "";
      } 
      else if (selectMethod === "Del") {
        firestorePromise = callFirestore.deleteDatabyDoc({
          collectionName: "cards",
          ID: accountId,
          account: account,
          amount: amount,
          bank: bank,
        });
        data.ID = "";
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
        {accountId ? '계좌 수정' : '계좌 추가'}
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>유형</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="수입" value="income" />
          <Picker.Item label="지출" value="expense" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>금액</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="금액 입력"
        />
      </View>

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