import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomCalendar from '../native_components/CustomCalendar'; // 달력 컴포넌트
import EI_View from '../native_components/EI_View'; // 지출 및 수익 컴포넌트
import MonthPayBar from '../native_components/MonthPayBar'; // 막대 그래프 컴포넌트
import { collection } from 'firebase/firestore';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';

const Main = () => {
  const todayDate = format(new Date(), 'yyyy-MM-dd');// 오늘 날짜
  // 12개월 동안의 데이터
  const monthlyData = [50, 40, 70, 43, 34, 27, 55, 67, 5, 0, 0, 0]
  const [calendarData, setCalendarData] = useState([]);
  const [curExpenses, setCurExpenses] = useState(0);
  const [curIncome, setCurIncome] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          // 모든 데이터 가져오기
          const result = await callFirestore.getDataAll({ collection: "moneyChange" });
          const formattedData = result.data.reduce((acc, item) => {
            const { date, amount, type } = item;
            const formattedDate = date;

            if (!acc[formattedDate]) {
              acc[formattedDate] = { expenses: 0, income: 0 };
            }

            if (type === 0) {
              acc[formattedDate].expenses += amount;
            } else if (type === 1) {
              acc[formattedDate].income += amount;
            }

            return acc;
          }, {});

          // 해당 월의 데이터 가져오기
          
          const month = await callFirestore.getDataByMonth({ collectionName: "moneyChange", ID: "Jeeny doe", year:todayDate.slice(0,4) , month: todayDate.slice(5,7) });
          let tmpE = 0;
          let tmpI = 0;
          for (const item of month) {
            if (item.type === 0) {
              tmpE += item.amount;
            } else if (item.type === 1) {
              tmpI += item.amount;
            }
          }
          setCurExpenses(tmpE);
          setCurIncome(tmpI);

          setCalendarData(formattedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

      return () => {
        // 화면을 떠날 때 정리 작업이 필요할 경우 추가
      };
    }, []) // 빈 배열을 사용하여 todayDate에 의존하지 않고 포커스될 때마다 실행
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 지출 및 수익 컴포넌트 */}
      <EI_View expenses={curExpenses} income={curIncome} />  {/* expenses에 지출, income에 수익을 넣어 상단에 표시 */}
      {/* 달력 컴포넌트 */}
      <CustomCalendar calendarData={calendarData} /> {/* 특정날짜의 총지출,수익 금액에 대한 정보인 calendarData를 전달하여 출력 */}
      {/* 12개월 막대 그래프 컴포넌트 */}
      {/*<MonthPayBar data={monthlyData} />*/}
      <MonthPayBar data={monthlyData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Main;
