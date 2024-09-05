import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const CustomCalendar = () => {
  const navigation = useNavigation();

  const handleDayPress = (day) => {
    navigation.navigate('MoneyChange', { selectedDate: day.dateString });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        theme={{
          textDayFontFamily: 'System',
          textMonthFontFamily: 'System',
          dayTextColor: '#333',
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
          monthTextColor: '#00adf5',
          textDayHeaderFontSize: 12,
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontFamily: 'System',
          textMonthFontFamily: 'System',
        }}
        monthFormat={'yyyy년 MM월'} // 달 형식
        dayNames={['일', '월', '화', '수', '목', '금', '토']} // 요일 이름
        dayNamesShort={['일', '월', '화', '수', '목', '금', '토']} // 요일 이름 축약형
        monthNames={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']} // 달 이름
        monthNamesShort={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']} // 달 이름 축약형
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomCalendar;
