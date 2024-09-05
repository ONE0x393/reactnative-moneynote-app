import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './native_components/Header'; // Header 컴포넌트 경로
import LoginPage from './native_pages/LoginPage';
import Main from './native_pages/Main';
import MomneyChange from './native_pages/MoneyChange';
import AccountList from './native_pages/AccountList';
import PayChart from './native_pages/PayChart';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.pageContainer}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // Stack의 Header를 사용하지 않도록 설정
            }}
          >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="MoneyChange" component={MomneyChange} />
            <Stack.Screen name="AccountList" component={AccountList} />
            <Stack.Screen name="PayChart" component={PayChart} />
          </Stack.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 차지하도록 설정
  },
  headerContainer: {
    height: 60, // Header의 고정 높이 설정
    zIndex: 1,
  },
  pageContainer: {
    flex: 1, // 나머지 공간을 모두 차지하도록 설정
  },
});

export default App;
