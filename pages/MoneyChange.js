import React from "react";
import { useState } from 'react';
import './MoneyChange.css';
import MoneyChangeButton from "../components/MoneyChangeButton";
import FloatingButton from "../components/FloatingButton";
import { useLocation } from 'react-router-dom'; // useLocation 훅 사용
import '../index.css';


function MoneyChange(){
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date'); // 내가 선택한 날짜의 정보
    return(
        <div className="page">
            <h1>{date}</h1>
            <MoneyChangeButton date="2024-08-23" text="일단은 homepage로 이동하게 설정" amount="$100" type={1} />
            <MoneyChangeButton date="2024-08-24" text="집주인 월세" amount="$100" type={0}/>
            <FloatingButton />
        </div>
    )
}

export default MoneyChange;