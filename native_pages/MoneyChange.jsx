import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MoneyChangeButton from '../native_components/MoneyChangeButton'; // 경로 수정
import PlusButton from '../native_components/PlusButton'; // 경로 추가
import { format } from 'date-fns';

import AsyncStorage from "@react-native-async-storage/async-storage";


const MoneyChange = () => {
  const route = useRoute();
  const todayDate = format(new Date(), 'yyyy-MM-dd');// 오늘 날짜
  const { selectedDate, newData} = route.params || {};// CustomCalendar에서 선택한 날짜를 전달
  const [selectedID,setSelectedID] = useState(null); //로그인 된 UID 임시 하드코딩
  const [data_list, setDataList] = useState([]); //선택한 날짜를 기반으로 검색하여 지출,수익 내역 데이터를 저장
  const navigation = useNavigation();

  const effectiveDate = selectedDate || todayDate;// 'selectedDate'가 없다면 오늘 날짜로 설정

  const plusDummy = {UID:null, date:effectiveDate, amount:'', catecory:'food',content:'',type:1,} //plus버튼을 눌렀을 시 넘길 임시데이터

  useEffect(() => {
    if (newData) {
      setDataList((prevData) => [newData, ...prevData]); // 기존 데이터에 새로운 데이터를 추가
    }
    const fetchData = async () => {
      try {
        const uid = await AsyncStorage.getItem("UID");
        if (!uid) { //로그인이 되어 있지 않다면 Login 페이지로 이동
          navigation.navigate("Login");
          return;
        }
        plusDummy.UID=uid;

        const results = await callFirestore.getDataByDoc({
          collectionName: "moneyChange", // Firebase 컬렉션 이름
          UID: uid, //조건1:UID
          date: effectiveDate, //조건2:선택된 날짜
        });
        setDataList(results); // data_list에 가져온 데이터 저장
        //console.log(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDate,newData]);//수정, 추가, 삭제를 통해 변경된 값이 전달되면 적용
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>지출-수익 내역</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {effectiveDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{effectiveDate}</Text>
          </View>
        )}
        {/* 상단에 날짜 표시 */}
        {data_list.slice() // 지출,수익 배열을 복사
        .reverse() // 복사한 배열을 역순으로 바꿈
        .map((item, index)=>{
          return(
          <MoneyChangeButton key = {index} //해당 배열을 MoneyChangeButton 배열로 만듦  또한 클릭시 수정가능
           item = {item}
           chosenID = {plusDummy.UID}
           />
          )
        })}
      </ScrollView>
      <PlusButton selectedDate={selectedDate} chosenID = {plusDummy.UID} item = {plusDummy}/> 
      {/* PlusButton 추가, 선택된 날짜(selectedDate)를 전달함 */}
    </View>
  );
};

const styles = StyleSheet.create({
  header:{
    height:50,
    backgroundColor:'#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // 하단 경계선 추가
    paddingTop:20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1, // 전체 공간을 차지하도록 설정
  },
  scrollContainer: {
    alignItems: 'center', // 자식들을 가로로 중앙에 정렬
    paddingVertical: 10, // 상하 패딩 추가
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MoneyChange;
