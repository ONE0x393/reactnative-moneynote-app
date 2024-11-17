import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import "./config/api.config";

import AsyncStorage from '@react-native-async-storage/async-storage';

import MenuBar from './native_components/MenuBar'; // Header 컴포넌트 경로
import LoginPage from './native_pages/LoginPage';
import Main from './native_pages/Main';
import MomneyChange from './native_pages/MoneyChange';
import AccountList from './native_pages/AccountList';
import PayChart from './native_pages/PayChart';
import Terms from './native_pages/Terms';
import Signup from './native_pages/Signup';
import AccountForm from './native_pages/AccountForm';
import AccountEdit from './native_pages/AccountEdit';
import AccountDetail from './native_pages/AccountDetail';
import MyPage from './native_pages/MyPage';

const Stack = createStackNavigator();

function App() {
  const setLoginState = async () => {
    const value = await AsyncStorage.getItem("UID");
    if (value !== null) setIsLogin(true);
  }
  
  const [isLogin, setIsLogin] = useState(false);
  setLoginState();

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.pageContainer}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // Stack의 MenuBar를 사용하지 않도록 설정
            }}
          >
            <Stack.Screen name="Main" component={Main} />
            {/* 메인: 월 총지출-수익 표기, 일별 총지출-수익 표기  */}
            <Stack.Screen
              name="Login"
              component={LoginPage}
              initialParams={{ isLogin: false }}
              listeners={({ route }) => ({
                state: () => {
                  // 자식 컴포넌트에서의 상태 변화 감지
                  if (route.params?.isLogin !== undefined) {
                    setIsLogin(route.params.isLogin);
                  }
                },
              })}
            />
            {/* 로그인 페이지  */}
            <Stack.Screen name="MoneyChange" component={MomneyChange} />
            {/* 지출,수익 내역 리스트  */}
            <Stack.Screen name="AccountList" component={AccountList} />
            {/* 계좌 및 금융수단 리스트  */}
            <Stack.Screen name="PayChart" component={PayChart} />
            {/* 지출 카테고리 Pie그래프 분석  */}
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="AccountForm" component={AccountForm} />
            {/* 지출,수익 수정 및 등록 */}
            <Stack.Screen name="AccountEdit" component={AccountEdit} />
            <Stack.Screen name="AccountDetail" component={AccountDetail} />

            {/* 마이페이지 */}
            <Stack.Screen name="MyPage" component={MyPage} />
          </Stack.Navigator>
        </View>
        <View style={styles.menubarContainer}>
          <MenuBar isLogin={isLogin} />
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 차지하도록 설정
    backgroundColor: '#fff',
  },
  menubarContainer: {
    height: 60, // MenuBar의 고정 높이 설정
    zIndex: 1,
  },
  pageContainer: {
    flex: 1, // 나머지 공간을 모두 차지하도록 설정
  },
});

export default App;
