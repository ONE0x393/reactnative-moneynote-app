import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AgreeButton from '../native_components/AgreeButton'; // 컴포넌트 경로

function Terms({ navigation }) {
  const handleAgree = () => {
    // 동의 후 로그인 페이지로 이동
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>약관 설명</Text>
      <ScrollView style={styles.termsBox}>
        <Text style={styles.termsText}>
          여기에 약관 내용을 표시합니다... {/* 실제 약관 내용을 여기에 삽입 */}
        </Text>
      </ScrollView>
      <AgreeButton onPress={handleAgree} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  termsBox: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Terms;