import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserInfoForm from '../native_components/UserInfo';

function SignupPage() {
  return (
    <View style={styles.signupPage}>
      <Text style={styles.signupTitle}>사용자 정보 입력</Text>
      <UserInfoForm />
    </View>
  );
}

const styles = StyleSheet.create({
  signupPage: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  signupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default SignupPage;