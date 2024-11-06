import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // React Native에서 사용하는 Picker
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; // DatePicker 대체
import { useRoute } from '@react-navigation/native';

function AccountForm() {
  const route = useRoute();
  const todayDate = new Date().toISOString().split('T')[0]; //금일 날짜 저장
  const { chosenDate = todayDate ,  del_positive = 0} = route.params || {}; //달력을 선택하여 MoneyChange페이지로 이동한 것이 아닌 경우 todayDate를 디폴트로 가져옴
  //del_positive는 수정을 목적으로 해당 페이지로 접근할 경우 "삭제" 버튼을 제공하기 위한 것

  const [type, setType] = useState('income');
  const [date, setDate] = useState(new Date(chosenDate));  //선택된 날짜를 기본값으로 설정
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택을 위한 상태

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    const data = {
      type,
      date,
      amount,
      category,
      content,
    };
    console.log(data);
    navigation.goBack(); // 이전 페이지로 이동
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>가계부 작성</Text>
      
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
        <Text style={styles.label}>날짜</Text>
        <Button title={new Date(chosenDate).toLocaleDateString()} onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={date}
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
          value={amount}
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

      <View style={styles.formGroup}>
        <Button title="저장" onPress={handleSubmit} /> {/*여기서 데이터베이스에 저장*/}
      </View>

      {del_positive === 1 &&(  //0이면 비활성화, 1이면 수정을 위한 것이므로 활성화 시킴
        <View style={styles.formGroup}>
          <Button title="삭제" onPress={handleSubmit} /> {/* 삭제 버튼 */}
        </View>
      )}
      {/*가장 중요한 것은 AccountForm페이지에 2가지 이동방법이 있는데
      1. MoneyChange페이지에서 새로운 내역을 추가하기 위해 "+"버튼을 누름
      2. 기존의 내역을 클릭하여 "수정"하기 위해 버튼을 누름
      1의 경우 아무런 문제가 없지만 2의 경우 삭제버튼 또한 준비해야한다.*/}
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
  buttonMargin:{
    marginBottom:20,
  },
});

export default AccountForm;