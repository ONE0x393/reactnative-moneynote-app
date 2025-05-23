import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { collection, Timestamp } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

function AccountForm() {
  const route = useRoute();
  const todayDate = format(new Date(), 'yyyy-MM-dd');// 오늘 날짜
  const { del_positive = 0, chosenID, item} = route.params || {};

  const [ttype, setType] = useState((item.type===0)?'expense':'income');
  let type=0;
  const [tdate, setDate] = useState(new Date(item.date));
  const [tamount, setAmount] = useState(item.amount);
  const [category, setCategory] = useState((item.category===undefined)?"food":item.category);
  const [content, setContent] = useState(item.content);
  const [bankAccount, setBankAccount] = useState('');
  const [bankAccounts, setBankAccounts] = useState([]);
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [UID, setUID] = useState(chosenID);
  const [realTime, setRealTime] = useState(Timestamp.now());

  //const [tempID, tempDate, tempAmount, tempCategory, tempContent] = 
  
  let selectMethod = ""; // 추가, 수정, 삭제를 분별하기 위한 장치
  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tdate;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  useEffect(()=>{
    const date = format(tdate, 'yyyy-MM-dd');
    if(date.slice(5,7)!==todayDate.slice(5,7)||date.slice(0,4)!==todayDate.slice(0,4)){
      const currentTime = new Date();
      const newDate = new Date(Number(date.slice(0, 4)), Number(date.slice(5, 7))-1, Number(date.slice(8)), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
      setRealTime(newDate);
    }
    const fetchBankData = async () => {
      try {
        const uid = await AsyncStorage.getItem("UID");
        if (!uid) {
          // UID가 없으면 로그인 페이지로 이동
          navigation.navigate("Login");
          return; // 더 이상 실행하지 않도록 return
        }
        setUID(uid);
        const results = await callFirestore.getDataAll({
          collection: 'cards',
        });
        const bankAccountNames = [...new Set(results.data.map((item) => `${item.bank} - ${item.account}`))];
        setBankAccounts(bankAccountNames);

        if (item.bank && item.account) {
          setBankAccount(`${item.bank} - ${item.account}`);
        }
      } catch (error) {
        console.error('Error fetching bank data:', error);
      }
    };

    fetchBankData();
  },[])

  

  const handleSubmit = () => {
    if(ttype ==='income') type = 1
    else if(ttype ==='expense')type=0
    const date = format(tdate, 'yyyy-MM-dd');
    const amount = Number(tamount);
    if (!bankAccount) {
      console.error('은행 및 계좌를 선택하세요.');
      return;
    }
    const [bank, account] = bankAccount.split(' - ');
    if (!bank || !account || !date || !amount || !category || !content) {
      console.error('필수 필드가 비어 있습니다.');
      return;
    }

    const data = {
      type,
      date,
      amount,
      category,
      content,
      uid: UID,
      bank,
      account,
      realTime,
    };

    try {
      let firestorePromise;
      if (selectMethod === "Add") {  // Firebase에 data 저장
        firestorePromise = callFirestore.addData({
          collection: 'moneyChange',  // 컬렉션 이름
          data: data,                 // 저장할 데이터
        });
        callFirestore.updateCardbymoney({collectionName:'cards', UID:data.uid, bank:data.bank, account:data.account, amount:data.amount, type:data.type});
         updateCardAmount(bank, account, type, amount);
      }
      else if(selectMethod === "Modify"){
        firestorePromise = callFirestore.updateDatabyDoc({
          collectionName: "moneyChange", // Firebase 컬렉션 이름
          searchUID: UID,
          searchdate: item.date,
          searchcategory: item.category,
          searchamount: Number(item.amount),
          searchcontent: item.content,
          UID: UID,
          date: date,
          amount: amount,
          category: category,
          content: content,
          bank: bank,
          account: account,
        });

        callFirestore.updateCardbymoney({
           collectionName:'cards',
           UID:data.uid, 
           bank:data.bank,
           account:data.account,
           amount:(tamount!==item.amount)?(tamount-item.amount):0,
           type:data.type});
        data.uid="";
      }
      else if(selectMethod === "Del"){
        firestorePromise = callFirestore.deleteDatabyDoc({
          collectionName: "moneyChange", // Firebase 컬렉션 이름
          UID: UID,
          date: date,
          amount: amount,
          category: category,
          content: content,
        });
        callFirestore.updateCardbymoney({collectionName:'cards', UID:data.uid, bank:data.bank, account:data.account, amount:data.amount*(-1), type:data.type});
        data.uid="";
      }
      // 저장 후 화면을 이전 페이지로 돌아가기
      //navigation.goBack();
      firestorePromise.then(()=>{
        navigation.navigate('MoneyChange', {
          newData: data,  // 새로운 데이터 전달
          selectedDate: date,
        });
      }).catch(errer=>{console.log("Error submitting data: ", error)})

      
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  const updateCardAmount = async (bank, account, type, amount) => {
    try {
      const query = await callFirestore.getDataByUID({
        collectionName: 'cards',
        UID: `${bank}-${account}`
      });

      if (query && query.length > 0) {
        const cardData = query[0];
        const updatedData = {
          ...cardData,
          in_amount: type === 1 ? cardData.in_amount + amount : cardData.in_amount,
          ex_amount: type === 0 ? cardData.ex_amount + amount : cardData.ex_amount,
        };

        await callFirestore.updateDatabyDoc({
          collectionName: 'cards',
          UID: `${bank}-${account}`,
          data: updatedData,
        });
      }
    } catch (error) {
      console.error('Error updating card amount:', error);
    }
  };

  const handleAdd = () => {
    selectMethod = "Add";
    handleSubmit();
  }

  const handleModify = () => {
    selectMethod = "Modify";
    handleSubmit();
  };

  const handleDel = () => {
    selectMethod = "Del";
    handleSubmit();
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>가계부 작성</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>유형</Text>
          <Picker
            selectedValue={ttype}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="수입" value="income" />
            <Picker.Item label="지출" value="expense" />
          </Picker>
        </View>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>은행 및 계좌</Text>
          <Picker
            selectedValue={bankAccount}
            onValueChange={(itemValue) => setBankAccount(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="-은행 계좌를 선택해주세요-" value="-은행 계좌를 선택해주세요-" />
            {bankAccounts.map((bankAccountName) => (
              <Picker.Item key={bankAccountName} label={bankAccountName} value={bankAccountName} />
            ))}
          </Picker>
        </View>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>날짜</Text>
          <Button
            title={tdate.toLocaleDateString()}
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={tdate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>금액</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={tamount}
            onChangeText={setAmount}
            placeholder="금액 입력"
          />
        </View>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>분류</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="식비" value="food" />
            <Picker.Item label="교통비" value="transportation" />
            <Picker.Item label="취미" value="hobby" />
            <Picker.Item label="기타" value="others" />
          </Picker>
        </View>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            placeholder="내용 입력"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10, // 원하는 padding 값 추가
  },
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
  buttonMargin: {
    marginBottom: 20,
  },
});

export default AccountForm;