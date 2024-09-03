import React, { useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AccountForm.css';

function AccountForm() {
  const [type, setType] = useState('income');
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

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
  };

  return (
    <div className="account-form-container">
      <h2 className="form-title">가계부 작성</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <SelectField
          label="유형"
          options={[
            { label: '수입', value: 'income' },
            { label: '지출', value: 'expense' }
          ]}
          value={type}
          onChange={setType}
        />

        <div className="form-group">
          <label className="form-label">날짜</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy/MM/dd"
            className="date-picker"
          />
        </div>

        <InputField
          label="금액"
          type="number"
          value={amount}
          onChange={setAmount}
        />

        <SelectField
          label="분류"
          options={[
            { label: '식비', value: 'food' },
            { label: '교통비', value: 'transportation' },
            { label: '취미', value: 'hobby' },
            { label: '기타', value: 'others' }
          ]}
          value={category}
          onChange={setCategory}
        />

        <InputField
          label="내용"
          type="text"
          value={content}
          onChange={setContent}
        />

        <button className="submit-button" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}

export default AccountForm;