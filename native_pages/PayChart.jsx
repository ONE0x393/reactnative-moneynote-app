import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CircleChart from '../native_components/CircleChart';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

const PayChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [month] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [in_output] = useState(['소비', '수익']);
  const [category, setCategory] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [outputData, setOutputData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await AsyncStorage.getItem("UID");
        if (!uid) { //로그인이 되어 있지 않다면 Login 페이지로 이동
          navigation.navigate("Login");
          return;
        }
        const results = await callFirestore.getDataByMonth({
          collectionName: 'moneyChange',
          UID: uid,
          year: new Date().getFullYear(),
          month: selectedMonth,
        });

        // 카테고리별 데이터 계산
        const categoryTotals = {};
        results.forEach((item) => {
          const { category, type, amount } = item;
          if (!categoryTotals[category]) {
            categoryTotals[category] = { income: 0, expense: 0 };
          }
          if (type === 1) {
            categoryTotals[category].income += amount;
          } else {
            categoryTotals[category].expense += amount;
          }
        });

        // 카테고리, 수입 및 지출 데이터를 퍼센트로 변환
        const categories = Object.keys(categoryTotals);
        const incomeValues = categories.map((cat) => categoryTotals[cat].income);
        const outputValues = categories.map((cat) => categoryTotals[cat].expense);
        const totalIncome = incomeValues.reduce((acc, val) => acc + val, 0);
        const totalExpense = outputValues.reduce((acc, val) => acc + val, 0);

        setCategory(categories);
        setIncomeData(totalIncome > 0 ? incomeValues.map((val) => ((val / totalIncome) * 100).toFixed(2)) : Array(categories.length).fill(0));
        setOutputData(totalExpense > 0 ? outputValues.map((val) => ((val / totalExpense) * 100).toFixed(2)) : Array(categories.length).fill(0));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>지출-수익 분류</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.page}>
          <View style={styles.selectorContainer}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode="dropdown"
            >
              {month.map((m) => (
                <Picker.Item key={m} label={`${m}월`} value={m} />
              ))}
            </Picker>
          </View>
          <ScrollView contentContainerStyle={styles.page}>
            {category.length === 0 ? (
              <Text style={styles.noDataText}>데이터가 없습니다.</Text>
            ) : (
              <>
                <CircleChart month={selectedMonth} in_output={in_output[0]} category={category} volume={outputData} />
                <CircleChart month={selectedMonth} in_output={in_output[1]} category={category} volume={incomeData} />
              </>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center', // 텍스트가 세로로 가운데 정렬되도록 설정
    alignItems: 'center', // 가로로 가운데 정렬
    backgroundColor: '#f0f0f0', // 배경 색상
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // 하단 경계선 추가
    paddingTop:20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10, // 원하는 padding 값 추가
    backgroundColor:'#fff',
  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  picker: {
    width: 150,
    marginBottom: 20,
  },
  pickerItem: {
    height: 150, // 아이템 높이 설정으로 스크롤 시 6~7개만 미리 보기 가능
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 50,
  },
});

export default PayChart;