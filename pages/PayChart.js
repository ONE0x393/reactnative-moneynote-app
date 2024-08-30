import React from "react";
import { useState } from 'react';
import MoneyChangeButton from "../components/MoneyChangeButton";
import FloatingButton from "../components/FloatingButton";
import CircleChart from "../components/CircleChart";
import '../index.css';


function PayChart(){
    let [month, month변경] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
    let [소비수익, 소비수익변경] = useState(['소비', '수익']);
    let [Category, Category변경] = useState(['의료','식비','월세','교통비','기타']);
    let [income, income변경] = useState([20,10,40,3,27]);
    let [output, output변경] = useState([30,0,40,10,20]);
    return(
        <div className="page">
            <CircleChart month={month[7]} in_output={소비수익[0]} category={Category}  volume ={income}/>
            <CircleChart month={month[7]} in_output={소비수익[1]} category={Category}  volume ={output}/>
        </div>
    )
}

export default PayChart;