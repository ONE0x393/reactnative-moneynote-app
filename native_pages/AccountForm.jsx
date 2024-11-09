import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { collection } from 'firebase/firestore';

function AccountForm() {
  const route = useRoute();
  const todayDate = new Date().toISOString().split('T')[0];
  const { chosenDate = todayDate ,  del_positive = 0, chosenID = "Jeeny doe",
    selContent = "", selAmount = "", selType='income', selCategory='food',
  } = route.params || {};

  const [ttype, setType] = useState(selType);
  let type=0;
  const [tdate, setDate] = useState(new Date(chosenDate));
  const [tamount, setAmount] = useState(selAmount);
  const [category, setCategory] = useState(selCategory);
  const [content, setContent] = useState(selContent);
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ID, setID] = useState(chosenID);

  //const [tempID, tempDate, tempAmount, tempCategory, tempContent] = 
  
  let selectMethod = ""; // 추가, 수정, 삭제를 분별하기 위한 장치

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tdate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    if(ttype ==='income') type = 1
    else if(ttype ==='expense')type=0
    const date = format(tdate, 'yyyy-MM-dd');
    const amount = Number(tamount);

    const data = {
      type,
      date,
      amount,
      category,
      content,
      ID,
    };

    
    console.log(data.category);
    try {
      if (selectMethod === "Add") {  // Firebase에 data 저장
        callFirestore.addData({
          collection: 'moneyChange',  // 컬렉션 이름
          data: data,                 // 저장할 데이터
        });
      }
      else if(selectMethod === "Modify"){
        callFirestore.updateDatabyDoc({
          collectionName: "moneyChange", // Firebase 컬렉션 이름
          searchID: chosenID,
          searchdate: chosenDate,
          searchcategory: selCategory,
          searchamount: Number(selAmount),
          searchcontent: selContent,
          ID: ID,
          date: date,
          amount: amount,
          category: category,
          content: content,
        });
        data.ID="";
      }
      else if(selectMethod === "Del"){
        callFirestore.deleteDatabyDoc({
          collectionName: "moneyChange", // Firebase 컬렉션 이름
          ID: ID,
          date: date,
          amount: amount,
          category: category,
          content: content,
        });
        data.ID="";
      }
      // 저장 후 화면을 이전 페이지로 돌아가기
      //navigation.goBack();
      navigation.navigate('MoneyChange', {
        newData: data,  // 새로운 데이터 전달
        selectedDate: date,
      });

      
    } catch (error) {
      console.error("Error submitting data: ", error);
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
  buttonMargin: {
    marginBottom: 20,
  },
});

export default AccountForm;