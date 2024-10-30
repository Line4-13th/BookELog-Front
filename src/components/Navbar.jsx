import { useState } from 'react'
import './navbar.scss';

const icons = import.meta.glob('../assets/bookelog_nav_icons/*.svg', { eager: true });

const iconMap = Object.keys(icons).reduce((acc, path) => {
  const iconName = path.split('/').pop().replace('.svg', '');
  acc[iconName] = icons[path].default || icons[path];
  return acc;
}, {});

function NavBar() {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(selectedIcon === icon ? null : icon);
  };

  return (
    <div className='navbar'>
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
  )
};

export default NavBar;
