// src/components/Navbar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './navbar.scss';

const icons = import.meta.glob('../assets/bookelog_nav_icons/*.svg', { eager: true });

const iconMap = Object.keys(icons).reduce((acc, path) => {
  const iconName = path.split('/').pop().replace('.svg', '');
  acc[iconName] = icons[path].default || icons[path];
  return acc;
}, {});

function NavBar() {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const navigate = useNavigate(); // Initialize navigate

  const handleIconClick = (icon) => {
    setSelectedIcon(icon); // Update selectedIcon before navigation

    // Navigate to corresponding route based on the icon
    switch (icon) {
      case 'home':
        navigate('/');
        break;
      case 'category':
        navigate('/curation');
        break;
      case 'record':
        navigate('/record'); // Navigate to Record page
        break;
      case 'mypage':
        navigate('/mypage');
        break;
      default:
        break;
    }
  };

  return (
    <div className='navbar'>
      <div className='icons'>
        <img 
          src={selectedIcon === 'home' ? iconMap['home_selected'] : iconMap['home']}
          alt="Home"
          onClick={() => handleIconClick('home')}
        />
        <img 
          src={selectedIcon === 'category' ? iconMap['category_selected'] : iconMap['category']}
          alt="Category"
          onClick={() => handleIconClick('category')}
        />
        <img 
          src={selectedIcon === 'record' ? iconMap['record_selected'] : iconMap['record']}
          alt="Record"
          onClick={() => handleIconClick('record')}
        />
        <img 
          src={selectedIcon === 'mypage' ? iconMap['mypage_selected'] : iconMap['mypage']}
          alt="My Page"
          onClick={() => handleIconClick('mypage')}
        />
      </div>
    </div>
  );
}

export default NavBar;


