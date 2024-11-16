import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Text, G } from 'react-native-svg';

const MonthPayBar = ({ monthlyExpense, monthlyIncome }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = 250;
  const chartWidth = screenWidth - 40; // 여백 포함
  const barWidth = chartWidth / (12 * 3); // 막대 너비 (간격 포함)
  const maxValue = Math.max(...monthlyExpense, ...monthlyIncome, 1); // 최소값을 1로 설정
  const scale = (chartHeight / maxValue)*0.9; // 데이터 값을 그래프 높이에 맞추는 스케일
  const paddingTop = 20; // 텍스트 표시를 위한 상단 여백
  const offset = barWidth / 2; // 왼쪽으로 조금 이동할 만큼 오프셋 추가

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={chartHeight + paddingTop + 40}>
        {/* 그래프 배경 색 추가 */}
        <Rect
          x="0"
          y={paddingTop}
          width={chartWidth}
          height={chartHeight}
          fill="#f0f0f0" // 배경 색
          rx="10" // 둥근 모서리
        />

        {monthlyExpense.map((exp, index) => {
          const expense = exp || 0; // 지출 값이 없으면 0으로 대체
          const income = monthlyIncome[index] || 0; // 수입 값이 없으면 0으로 대체
          const x = index * (barWidth * 3) + offset; // 각 막대의 X 좌표에 오프셋 추가
          const expenseHeight = (expense * scale); // 지출 막대의 높이
          const incomeHeight = income * scale; // 수입 막대의 높이

          // 텍스트의 중간 부분을 맞추기 위한 X 좌표 계산
          const labelX = x + barWidth; // 라벨 중앙 부분의 X 좌표는 막대 중간

          return (
            <G key={index}>
              {/* 지출 막대 (빨간색) */}
              <Rect
                x={x}
                y={chartHeight + paddingTop - expenseHeight}
                width={barWidth}
                height={expenseHeight}
                fill="#ff5252"
                rx="5" // 둥근 모서리 효과
              />
              {/* 수입 막대 (초록색) */}
              <Rect
                x={x + barWidth}
                y={chartHeight + paddingTop - incomeHeight}
                width={barWidth}
                height={incomeHeight}
                fill="#6F8CFF"
                rx="5" // 둥근 모서리 효과
              />
              {/* 지출 값 표시 */}
              <Text
                x={x + barWidth / 2}
                y={chartHeight + paddingTop - expenseHeight - 5}
                fontSize={10}
                fill="#ff5252"
                textAnchor="middle"
              >
                {expense}
              </Text>
              {/* 수입 값 표시 */}
              <Text
                x={x + barWidth + barWidth / 2}
                y={chartHeight + paddingTop - incomeHeight - 5}
                fontSize={10}
                fill="#6F8CFF"
                textAnchor="middle"
              >
                {income}
              </Text>
              {/* 라벨 (월 표시) */}
              <Text
                x={labelX-4} // 라벨의 중앙이 맞춰짐
                y={chartHeight + paddingTop + 15}
                fontSize={10}
                fill="black"
                textAnchor="middle" // 텍스트 중앙 정렬
                fontWeight="bold" // 글씨 두께
              >
                {index + 1}월
              </Text>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default MonthPayBar;
