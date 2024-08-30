import React from "react";
import { useState } from 'react';
import './AccountList.css';
import AccountButton from "../components/AccountButton";
import '../index.css';
import FloatingButton from "../components/FloatingButton";


function AccountList(){
    let [지출, 지출변경] = useState(100000);
    let [수입, 수입변경] = useState(200000);
    return(
        <div className="page">
            <AccountButton name="a계좌" text="xxxx-xxxx-xxxx" amount={300000}/>
            <AccountButton name="b계좌" text="임시로 homepage로 이동설정" amount={500000}/>
            <AccountButton name="c계좌" amount={500000}/>
            <FloatingButton/>
        </div>
    )
}

export default AccountList;