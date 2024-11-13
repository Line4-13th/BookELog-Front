import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordLogin from './RecordLogIn';
import RecordToggle from './RecordToggle';
import logo from '../../../public/book-e-log-black.svg';
import './record.scss';

function Record() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const navigate = useNavigate();

  return (
    <div className="record-container">
      <header className="record-header">
        <img
          src={logo}
          alt="Book-E-Log Logo"
          className="record-logo"
          onClick={() => navigate('/')}
        />
        <p className="record-title">독서기록장</p>
      </header>
      <section className="record-section">
        {!isLoggedIn ? (
          <RecordLogin />
        ) : (
          <RecordToggle />
        )}
      </section>
    </div>
  )
}

export default Record;
