import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory-native';

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
      <VictoryChart
        width={chartWidth}
        height={300}
        domainPadding={20} // 막대와 X축 사이의 간격
      >
        <VictoryAxis
          tickValues={months.map((_, index) => index + 1)} // X축의 위치를 1부터 12까지 설정
          tickFormat={months} // 레이블로 월별 이름을 설정
          style={{
            axis: { stroke: '#ccc' },
            tickLabels: { fontSize: 12, padding: 5 }
          }}
        />
        <VictoryBar
          data={data.map((value, index) => ({ x: index + 1, y: value }))}
          style={{
            data: { fill: '#d1c4e9' }, // 막대 색상
          }}
          labels={({ datum }) => datum.y} // 막대 위에 표시할 값
          labelComponent={<VictoryLabel dy={-10} />} // 값의 위치 조정
        />
      </VictoryChart>
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
