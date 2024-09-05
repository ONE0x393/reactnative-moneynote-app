import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; //버튼 클릭시 이동

function Header() {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();// 페이지 이동

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.header}>
        <View style={styles.menuContainer}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
                <Text style={styles.menuText}>MENU</Text>
              </TouchableOpacity>
            }
            anchorPosition="bottom" // 드롭다운이 버튼의 바닥에서 시작되도록 설정
          >
            <Menu.Item onPress={() => {navigation.navigate('Main'); closeMenu();}} title="Main"style={styles.menuItem}titleStyle={styles.menuItemText}/>
            <Menu.Item onPress={() => {navigation.navigate('Login'); closeMenu();}} title="Login" style={styles.menuItem}titleStyle={styles.menuItemText}/>
            <Menu.Item onPress={() => {navigation.navigate('MoneyChange'); closeMenu();}} title="MoneyChange" style={styles.menuItem}titleStyle={styles.menuItemText}/>
            <Menu.Item onPress={() => {navigation.navigate('AccountList'); closeMenu();}} title="AccountList" style={styles.menuItem}titleStyle={styles.menuItemText}/>
            <Menu.Item onPress={() => {navigation.navigate('PayChart'); closeMenu();}} title="PayChart" style={styles.menuItem}titleStyle={styles.menuItemText}/>
          </Menu>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#f0f0f0', // 옅은 회색
    justifyContent: 'center',
    alignItems: 'flex-end', // 우측 정렬
    paddingHorizontal: 16, // 좌우 패딩 추가
    elevation: 4, // 안드로이드에서 그림자 추가
    shadowColor: '#000', // iOS에서 그림자 추가
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuContainer: {
    position: 'relative', // 상대적 위치 설정
  },
  menuButton: {
    backgroundColor: '#87CEEB', // 하늘색 배경
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  menuText: {
    color: '#fff', // 하늘색 버튼의 텍스트 색상
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
