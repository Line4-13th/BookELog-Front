import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './recordtoggle.scss';
import Calendar from 'react-calendar';
import FolderView from './FolderView';
import './Calendar.css';
import axios from 'axios';
import add from '../../assets/add.svg';
import API_URL from '../../../API_URL';

function RecordToggle() {
  const [active, setActive] = useState('calendar');
  const [value, onChange] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);
  const navigate = useNavigate(); // useNavigate 초기화

  //! 달력 점 가져오기
  useEffect(() => {
    const monthNum = activeMonth.getMonth() + 1;
    const yearNum = activeMonth.getFullYear();

    console.log(``)

    axios.get(`${API_URL}/reading_log/reading_logs/dots/?month=${yearNum}-${monthNum}`)
      .then(response => {
        const dates = response.data.dots.map(dateString => new Date(dateString));
        setMarkedDates(dates);
      })
      .catch(error => {
        console.error('달력 점 가져오기 오류:', error);
      });
  }, [activeMonth]);
  

  const tileContent = ({ date, view }) => {
    if (view === 'month' && markedDates.some(d => d.toDateString() === date.toDateString())) {
      return <div className="mark"></div>;
    }
    return null;
  };

  const handleToggle = (value) => {
    setActive(value);
  };

  const handleAddButtonClick = () => {
    navigate('/booksearch'); // 책 검색 페이지로 이동
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveMonth(activeStartDate);
    console.log(activeMonth);
  };


  return (
    <div className="record-toggle-container">
      <div className="toggle-button-container">
        <button
          className={`toggle-button ${active === 'calendar' ? 'active' : ''}`}
          onClick={() => handleToggle('calendar')}
        >
          calendar
        </button>
        <button
          className={`toggle-button ${active === 'file' ? 'active' : ''}`}
          onClick={() => handleToggle('file')}
        >
          file
        </button>
      </div>
      <section className="record-toggle-section">
        {active === 'calendar' && (
          <Calendar
            onChange={onChange}
            value={value} 
            locale='us-US'
            formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
            prev2Label={null}
            next2Label={null}
            tileContent={tileContent}
            onActiveStartDateChange={handleActiveStartDateChange}
          />
        )}
        {active === 'file' && (
          <FolderView />
        )}
      </section>
      {active === 'file' && (
        <button className="add-record-button" onClick={handleAddButtonClick}>
          <img
            src={add}
            alt="add book report button"
            className="add-record-image"
          />
        </button>
      )}
    </div>
  )
}

export default RecordToggle;
