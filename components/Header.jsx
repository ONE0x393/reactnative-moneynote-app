import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="dropdown">
        <button className="dropbtn">Menu</button>
        <div className="dropdown-content">
          <a href="/home">Home</a>
          <a href="/moneychange">Money Change</a>
          <a href="/accountlist">Account List</a>
          <a href="/paychart">Pay Chart</a>
        </div>
      </div>
    </header>
  );
}

export default Header;