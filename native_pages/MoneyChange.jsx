import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MoneyChangeButton from '../native_components/MoneyChangeButton'; // 경로 수정
import PlusButton from '../native_components/PlusButton'; // 경로 추가
import { format } from 'date-fns';

const MoneyChange = () => {
  const route = useRoute();
  const todayDate = format(new Date(), 'yyyy-MM-dd');// 오늘 날짜
  const { selectedDate, newData } = route.params || {};
  const selectedID = "Jeeny doe";
  const [data_list, setDataList] = useState([]);

  const effectiveDate = selectedDate || todayDate;// 'selectedDate'가 없다면 오늘 날짜로 설정

  const plusDummy = {ID:selectedID, date:effectiveDate, amount:'', catecory:'food',content:'',type:1,}

  useEffect(() => {
    if (newData) {
      setDataList((prevData) => [newData, ...prevData]); // 기존 데이터에 새로운 데이터를 추가
    }
    const fetchData = async () => {
      try {
        const results = await callFirestore.getDataByDoc({
          collectionName: "moneyChange", // Firebase 컬렉션 이름
          ID: selectedID,
          date: effectiveDate,
        });
        setDataList(results); // data_list에 가져온 데이터 저장
        //console.log(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDate,newData]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {effectiveDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{effectiveDate}</Text>
          </View>
        )} {/* 상단에 날짜 표시 */}
        {data_list.slice() // 지출,수익 배열을 복사
        .reverse() // 복사한 배열을 역순으로 바꿈
        .map((item, index)=>{
          return(
          <MoneyChangeButton key = {index} //해당 배열을 MoneyChangeButton 배열로 만듦  또한 클릭시 수정가능
           item = {item}
           chosenID = {selectedID}
           />
          )
        })}
      </ScrollView>
      <PlusButton selectedDate={selectedDate} chosenID = {selectedID} item = {plusDummy}/> {/* PlusButton 추가, 선택된 날짜(selectedDate)를 전달함 */}
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
