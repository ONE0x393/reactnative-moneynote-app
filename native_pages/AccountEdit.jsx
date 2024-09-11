import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // useParams 대체
import InputField from '../native_components/InputField';
import ToggleButton from '../native_components/ToggleButton';
import ActionButton from '../native_components/ActionButton';

function AccountEditPage() {
  const route = useRoute(); // useParams 대체
  const navigation = useNavigation();
  const { accountId } = route.params || {}; // 파라미터로 accountId 받기

  const [type, setType] = useState('수입');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('?? 은행');

  const handleSave = () => {
    console.log({ type, amount, account, bank });
    navigation.goBack(); // 이전 페이지로 이동
  };

  const handleEdit = () => {
    console.log('수정 클릭');
    // 수정 로직 추가
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>계좌 수정 페이지 (계좌 ID: {accountId})</Text>
      <ToggleButton
        options={['수입', '지출']}
        selectedOption={type}
        onChange={setType}
      />
      <InputField 
        label="금액" 
        value={amount} 
        onChange={setAmount} 
      />
      <InputField 
        label="계좌/카드" 
        value={account} 
        onChange={setAccount} 
      />
      <InputField 
        label="은행" 
        value={bank} 
        onChange={setBank} 
      />
      <ActionButton
        onSave={handleSave} 
        onEdit={handleEdit} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AccountEditPage;