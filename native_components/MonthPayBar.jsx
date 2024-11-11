import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const MonthPayBar = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const onChange = () => {
      setChartWidth(Dimensions.get('window').width);
    };

    // 화면 크기 변경 시 호출되는 이벤트 리스너 등록
    Dimensions.addEventListener('change', onChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  // 12개월의 레이블
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: months, // 월별 레이블
          datasets: [
            {
              data: data, // 월별 데이터 값
            }
          ]
        }}
        width={chartWidth} // 차트 너비
        height={300} // 차트 높이
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // 소수점 이하 자리수
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // 막대 색상 (빨간색)
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 레이블 색상
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 12, // 레이블의 글자 크기
            padding: 5, // 레이블의 간격
          },
        }}
        fromZero={true} // Y축이 0부터 시작하도록 설정
        showValuesOnTopOfBars={true} // 막대 위에 값 표시
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MonthPayBar;
