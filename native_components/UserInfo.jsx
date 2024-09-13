import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function UserInfoForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    // 회원가입 로직 구현
    console.log({ name, email, password, passwordConfirm, phoneNumber, verificationCode });
    Alert.alert('회원가입 되었습니다');
    navigation.navigate('Main');
  };

  const handleVerificationClick = () => {
    // 인증번호 발송 로직
    console.log('인증번호 발송');
  };

  return (
    <View style={styles.form}>
      <View style={styles.formGroup}>
        <Text>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름 입력"
        />
      </View>

      <View style={styles.formGroup}>
        <Text>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 입력"
        />
      </View>

      <View style={styles.formGroup}>
        <Text>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="비밀번호 입력"
        />
      </View>

      <View style={styles.formGroup}>
        <Text>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
          placeholder="비밀번호 확인"
        />
      </View>

      <View style={styles.formGroup}>
        <Text>전화번호</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="전화번호 입력"
        />
        <Button title="인증번호 발송" onPress={handleVerificationClick} />
      </View>

      <View style={styles.formGroup}>
        <Text>인증번호 입력</Text>
        <TextInput
          style={styles.input}
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="인증번호 입력"
        />
      </View>

      <Button title="회원 가입" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default UserInfoForm;