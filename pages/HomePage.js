import React from "react";
import './HomePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate

import DatePicker, { registerLocale } from 'react-datepicker'; //캘린더 라이브러리
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

import MonthPayChart from "../components/MonthPayChart";
import '../index.css';


registerLocale('ko', ko); //캘린더 한글화

function HomePage(){
  let [지출, 지출변경] = useState(100000);
  let [수입, 수입변경] = useState(200000);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0]; // 날짜를 'YYYY-MM-DD' 형식으로 포맷팅
    navigate(`/moneychange?date=${formattedDate}`); // MoneyChange 페이지로 이동
  };

  const data = [
    { month: '1', 만원: 20,},
    { month: '2', 만원: 70,},
    { month: '3', 만원: 50,},
    { month: '4', 만원: 40,},
    { month: '5', 만원: 60,},
    { month: '6', 만원: 10,},
    { month: '7', 만원: 40,},
    { month: '8', 만원: 70,},
    { month: '9', 만원: 30,},
    { month: '10', 만원: 20,},
    { month: '11', 만원: 20,},
    { month: '11', 만원: 40,}
  ];
  // 현재 월을 구하는 로직
  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'numeric' }).format(new Date());

    return(
    <div className="page">
      <div className="income-expense">
        <span className="divider"></span> {/* 수직선 역할 */}
        <span className="expense">지출 금액<br/>{지출}원</span>
        <span className="divider"></span> {/* 수직선 역할 */}
        <span className="income">수입 금액<br/>{수입}원</span>
        <span className="divider"></span> {/* 수직선 역할 */}
      </div>

      <div className="calendar-container">
          <DatePicker
            locale="ko"
            selected={selectedDate}
            onChange={handleDateClick}
            inline
            calendarClassName="custom-datepicker" //캘린더 모양
          />
      </div>
      <div className="barchart_shell">
        <MonthPayChart data={data} currentMonth={currentMonth} />
      </div>
    </div>
    
    )
}

export default HomePage;