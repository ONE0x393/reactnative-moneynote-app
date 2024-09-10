import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuBar from './native_components/MenuBar'; // Header 컴포넌트 경로
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
        <View style={styles.pageContainer}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // Stack의 MenuBar를 사용하지 않도록 설정
            }}
          >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="MoneyChange" component={MomneyChange} />
            <Stack.Screen name="AccountList" component={AccountList} />
            <Stack.Screen name="PayChart" component={PayChart} />
          </Stack.Navigator>
        </View>
        <View style={styles.menubarContainer}>
          <MenuBar />
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 차지하도록 설정
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


/*
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MoneyChange from './pages/MoneyChange.jsx';
import Header from './components/MenuBarHeader.jsx';
import AccountList from './pages/AccountList.jsx';
import PayChart from './pages/PayChart.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AccountForm from './pages/AccountForm.jsx';
import AccountEditPage from './pages/AccountEditPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  return (
    <Router>
      <Header/>
      <div style={{ marginTop: '37px' }}></div> 
      <div className='route_page'>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/moneyChange' element={<MoneyChange />} />
          <Route path='/accountlist' element={<AccountList />} />
          <Route path='/paychart' element={<PayChart />} />
          <Route path='/accountform' element={<AccountForm />} />
          <Route path='/accountedit/:accountId' element={<AccountEditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
*/
