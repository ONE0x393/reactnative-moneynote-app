import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import React from 'react';
import { useState } from 'react';

const CircleChart = ({ month, in_output, category, volume}) => {
    const payData = [
        { category: category[0], value: volume[0], fill: '#EB6927' },
        { category: category[1], value: volume[1], fill: '#2D8CFF' },
        { category: category[2], value: volume[2], fill: '#8DB600' },
        { category: category[3], value: volume[3], fill: '#FFCC66' },
        { category: category[4], value: volume[4], fill: '#990033' }
    ];
    return (
        <div>
            <h1>{month}월 {in_output}량</h1>
            <PieChart width={300} height={300}>
                <Legend
                    height={110}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconSize={7}
                    payload={[
                        { value: `${category[0]} ${volume[0]}%`, type: 'square', color: '#EB6927' },
                        { value: `${category[1]} ${volume[1]}%`, type: 'square', color: '#2D8CFF' },
                        { value: `${category[2]} ${volume[2]}%`, type: 'square', color: '#8DB600' },
                        { value: `${category[3]} ${volume[3]}%`, type: 'square', color: '#FFCC66' },
                        { value: `${category[4]} ${volume[4]}%`, type: 'square', color: '#990033' }
                    ]}
                />
                <Pie
                    data={payData}
                    dataKey="value"
                    nameKey="category"
                    innerRadius={60}
                    outerRadius={80}
                    cx={80}
                    cy={100}
                />
                <Tooltip />
            </PieChart>
        </div>
    )
}
export default CircleChart;