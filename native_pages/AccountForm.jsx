import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // React Native에서 사용하는 Picker
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; // DatePicker 대체

function AccountForm() {
  const [type, setType] = useState('income');
  const [date, setDate] = useState(new Date());
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
        <Button title={date.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />
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

      <Button title="저장" onPress={handleSubmit} />
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

export default AccountForm;