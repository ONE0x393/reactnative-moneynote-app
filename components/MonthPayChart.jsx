import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


const CustomTooltip = ({ payload, label }) => { //커스텀 툴팁 막대에 마우스 올리면 뜨는 문장
    if (payload && payload.length) {
      const { month, 만원 } = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '10px' }}>
          <p>{month}월: {만원} 만원</p>
        </div>
      );
    }
    return null;
  };
const formatXAxis = (tickItem) => {
    return `${tickItem}월`;
  };
const MonthPayChart = ({data, currentMonth }) => {
    const getBarColor = (month) => {
        return month === currentMonth ? '#3EE092' : '#3A495E'; // 현재 월과 일치하면 녹색, 아니면 어두운 파란색
      };
    

      return (
        <BarChart width={630} height={400} data={data}>
          <CartesianGrid strokeDasharray="5" />
          <XAxis dataKey="month" tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Bar dataKey="만원" radius={10}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.month)} />
            ))}
          </Bar>
        </BarChart>
      );

}

export default MonthPayChart;