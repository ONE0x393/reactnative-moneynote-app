import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "../config/firebase";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // 로그인 로직 구현
    const okFn = async (info) => {
      try {
        console.log("INSERT UID: ", info.uid);
        await AsyncStorage.setItem("UID", info.uid);
        navigation.navigate("Main");
      } catch (e) {
        console.error(e);
      }
    }
    auth.signIn(email, password, okFn);
  };

  const handleSignupClick = () => {
    // 회원가입 클릭 시 약관 동의 페이지로 이동
    navigation.navigate('Terms');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>앱 이름</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email(ID) Field"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password Field"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>계정을 잊으셨나요?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignupClick}>
          <Text style={styles.link}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  appName: {
    marginBottom: 30,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  link: {
    color: '#007bff',
    fontSize: 14,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    backgroundColor: '#007bff',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 18,
  },
}
);
