import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MoneyChangeButton from '../native_components/MoneyChangeButton'; // 경로 수정
import PlusButton from '../native_components/PlusButton'; // 경로 추가
import { format } from 'date-fns';

const MoneyChange = () => {
  const route = useRoute();
  const todayDate = format(new Date(), 'yyyy-MM-dd');// 오늘 날짜
  const { selectedDate = todayDate } = route.params || {};
  const data_list = [ //지출, 수익 내역
    {date:"2024-09-01",
     content:"Sample Content", //소비, 지출의 내용
     amount:"$100",
     type:1 //1은 수익  0은 지출을 나타냄
    },
    {date:"2024-09-02",
      content:"Sample Content",
      amount:"$100",
      type:1
     },
     {date:"2024-09-03",
      content:"Sample Content",
      amount:"$100",
      type:1
     },
     {date:"2024-09-04",
      content:"Sample Content",
      amount:"$100",
      type:0
     },
     {date:"2024-09-05",
      content:"Sample Content",
      amount:"$100",
      type:0
     },
     {date:"2024-09-06",
      content:"Sample Content",
      amount:"$100",
      type:1
     },
     {date:"2024-09-07",
      content:"Sample Content",
      amount:"$100",
      type:1
     },
     {date:"2024-09-08",
      content:"Sample Content",
      amount:"$100",
      type:0
     },
     {date:"2024-09-09",
      content:"Sample Content",
      amount:"$100",
      type:1
     },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>
        )}
        {data_list.slice() // 지출,수익 배열을 복사
        .reverse() // 복사한 배열을 역순으로 바꿈
        .map((item, index)=>{
          return(
            <MoneyChangeButton key = {index} //해당 배열을 MoneyChangeButton 배열로 만듦  또한 클릭시 수정가능
           date={item.date}
           content={item.content}
           amount={item.amount}
           type={item.type}
           />
          )
        })}
        
        {/* 더 많은 MoneyChangeButton을 추가할 수 있습니다 */}
      </ScrollView>
      <PlusButton selectedDate={selectedDate} /> {/* PlusButton 추가 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 공간을 차지하도록 설정
  },
  scrollContainer: {
    alignItems: 'center', // 자식들을 가로로 중앙에 정렬
    paddingVertical: 10, // 상하 패딩 추가
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MoneyChange;
