import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MoneyChange from './pages/MoneyChange.jsx';
import Header from './components/MenuBarHeader.jsx';
import AccountList from './pages/AccountList.jsx';
import PayChart from './pages/PayChart.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AccountForm from './pages/AccountForm.jsx';
import AccountEditPage from './pages/AccountEditPage.jsx';

function App() {
  return (
    <Router>
      <Header/>
      <div style={{ marginTop: '37px' }}></div> {/* Header 높이만큼의 마진 추가  fsdfa*/}
      <div className='route_page'>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/moneyChange' element={<MoneyChange />} />
          <Route path='/accountlist' element={<AccountList />} />
          <Route path='/paychart' element={<PayChart />} />
          <Route path='/accountform' element={<AccountForm />} />
          <Route path='/accountedit/:accountId' element={<AccountEditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
