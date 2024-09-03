import React from 'react';
import { Link } from 'react-router-dom';
import './MenuBarHeader.css';

function Header() {
  return (
    <header className="header">
      <div className="dropdown">
        <button className="dropbtn">Menu</button>
        <div className="dropdown-content">
          <Link to="/home">Home</Link>
          <Link to="/moneychange">Money Change</Link>
          <Link to="/accountlist">Account List</Link>
          <Link to="/paychart">Pay Chart</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;