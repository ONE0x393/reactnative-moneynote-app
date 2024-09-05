import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CircleChart from '../native_components/CircleChart';

const PayChart = () => {
    const [month] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [in_output] = useState(['소비', '수익']);
    const [category] = useState(['의료', '식비', '월세', '교통비', '기타']);
    const [income] = useState([20, 10, 40, 3, 27]);
    const [output] = useState([30, 0, 40, 10, 20]);

    return (
        <ScrollView contentContainerStyle={styles.page}>
            <CircleChart month={month[7]} in_output={in_output[0]} category={category} volume={income} />
            <CircleChart month={month[7]} in_output={in_output[1]} category={category} volume={output} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default PayChart;
