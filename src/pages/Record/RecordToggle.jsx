import { useState } from 'react';
import './recordtoggle.scss';
import Calendar from 'react-calendar';
import FolderView from './FolderView';
import './Calendar.css';
// import axios from 'axios';
import add from '../../assets/add.svg';

function RecordToggle() {
  const [active, setActive] = useState('calendar');
  const [value, onChange] = useState(new Date());
  // const [markedDates, setMarkedDates] = useState([]);

  // useEffect(() => {
  //   axios.get(`{API_URL}/reading_log/reading_logs/`)
  //     .then(response => {
  //       const dates = response.data.map(item => new Date(item.date));
  //       setMarkedDates(dates);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching marked dates:', error);
  //     });
  // }, []);

  const markedDates = [new Date('2024-11-08')];

  const tileContent = ({ date, view }) => {
    if (view === 'month' && markedDates.some(d => d.toDateString() === date.toDateString())) {
      return <div className="mark"></div>;
    }
    return null;
  };

  const handleToggle = (value) => {
    setActive(value);
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
          />
        )}
        {active === 'file' && (
          <FolderView />
        )}
      </section>
      {active === 'file' && (
        <button className="add-record-button">
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
