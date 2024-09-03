import React, { useState } from 'react';
import SelectField from '../components/SelectField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AccountForm.css';
import { useNavigate } from 'react-router-dom';

function AccountForm() {
  const [type, setType] = useState('income');
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      type,
      date,
      amount,
      category,
      content,
    };
    console.log(data);
    // 데이터를 저장하거나 API에 보낼 수 있습니다.
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="account-form-container">
      <h2 className="form-title">가계부 작성</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">유형</label>
          <SelectField
            options={[
              { label: '수입', value: 'income' },
              { label: '지출', value: 'expense' }
            ]}
            value={type}
            onChange={setType}
          />
        </div>

        <div className="form-group">
          <label className="form-label">날짜</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy/MM/dd"
            className="date-picker"
          />
        </div>

        <div className="form-group">
          <label className="form-label">금액</label>  {/* 금액 라벨 추가 */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label className="form-label">분류</label>
          <SelectField
            options={[
              { label: '식비', value: 'food' },
              { label: '교통비', value: 'transportation' },
              { label: '취미', value: 'hobby' },
              { label: '기타', value: 'others' }
            ]}
            value={category}
            onChange={setCategory}
          />
        </div>

        <div className="form-group">
          <label className="form-label">내용</label>  {/* 내용 라벨 추가 */}
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
          />
        </div>

        <button className="submit-button" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}

export default AccountForm;