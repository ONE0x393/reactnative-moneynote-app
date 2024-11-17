import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const CustomCalendar = ({ calendarData }) => {
  const navigation = useNavigation();

  const handleDayPress = (day) => {
    navigation.navigate('MoneyChange', { selectedDate: day.dateString });
  };

  // markedDates를 calendarData에 맞게 생성
  const markedDates = calendarData && Object.keys(calendarData).length > 0
    ? Object.keys(calendarData).reduce((acc, date) => {
        const { expenses, income } = calendarData[date];
        acc[date] = {
          customStyles: {
            container: {
              backgroundColor: '#e6f7ff', // 날짜 배경색
            },
            text: {
              color: '#000',
              fontWeight: 'bold',
            },
          },
          marked: true,
          customText_expens: expenses && !isNaN(expenses) ? `-${expenses.toLocaleString()}` : null,
          customText_income: income && !isNaN(income) ? `+${income.toLocaleString()}` : null,
        };
        return acc;
      }, {})
    : {};

  return (
    <View style={styles.container}>
      <Calendar
        markingType={'custom'}
        markedDates={markedDates}
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
        dayComponent={({ date, state, marking }) => {
          return (
            <TouchableOpacity onPress={() => handleDayPress(date)}>
              <View style={styles.dayContainer}>
                <Text style={[styles.dateText, state === 'disabled' && { color: 'gray' }]}>
                  {date.day}
                </Text>

                {/* Ensure marking is present before rendering text */}
                {marking && marking.customText_expens ? (
                  <Text style={[styles.customText, { color: 'red' }]}>
                    {marking.customText_expens}
                  </Text>
                ) : null}

                {marking && marking.customText_income ? (
                  <Text style={[styles.customText, { color: 'blue' }]}>
                    {marking.customText_income}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dayContainer: {
    padding: 10, // 날짜 컨테이너 안쪽 여백을 늘려서 간격을 넓힘
    margin: 0, // 날짜 컨테이너 바깥쪽 여백을 추가하여 간격 조절
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
  },
  customText: {
    fontSize: 7,
  },
});

export default CustomCalendar;
