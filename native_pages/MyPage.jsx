import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const MyPage = () => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const navigation = useNavigation();
  const onLogout = async () => {
    await AsyncStorage.removeItem("UID");
    navigation.navigate("Login");
  }

  useEffect(() => {
    const fetchData = async () => {
      const UID = await AsyncStorage.getItem("UID");
      const [userInfo] = await callFirestore.getUserInfoByUID({ UID: UID });

      setUserName(userInfo.name);
      setUserEmail(userInfo.email);

      console.log(userInfo);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.infoTop}>
          <Text style={styles.nameText}>{ userName }님 환영합니다</Text>

          <TouchableOpacity style={styles.btnLogout} onPress={onLogout} activeOpacity={0.8}>
            <Text style={{ fontSize: 12, color: "white" }} >로그아웃</Text>
          </TouchableOpacity>
        </View>
        
        <Text>{ userEmail }</Text>
      </View>

      <View>

      </View>
    </View>
  )
}

export default MyPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  infoBox: {
    backgroundColor: 'lightgray',
    shadowColor: '#000',

    marginTop: 50,
    width: '100%',
    padding: 20,
    borderRadius: 10,

    justifyContent: 'center',
    flexDirection: 'column',
  },
  infoTop: {
    marginBottom: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  btnLogout: {
    backgroundColor: 'darkgray',
    paddingHorizontal: 10,
    borderRadius: 5,

    justifyContent: 'center',
  },
});