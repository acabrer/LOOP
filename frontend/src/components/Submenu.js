import React from 'react';
import { Music, Mic, Headphones } from 'lucide-react';

const topLevelMenu = [
  { name: 'Genres', icon: Music },
  { name: 'Instruments', icon: Mic },
  { name: 'Sound FX', icon: Headphones },
];

const Submenu = ({ selectedCategory, onSelectCategory }) => {
  return (
    <nav className="top-menu">
      {topLevelMenu.map((item) => (
        <button
          key={item.name}
          className={`menu-item ${selectedCategory === item.name ? 'active' : ''}`}
          onClick={() => onSelectCategory(item.name)}
        >
          <item.icon className="menu-icon" />
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default Submenu;