import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ChevronDown } from 'lucide-react';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">Loop</div>
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="What sound are you looking for?" />
      </div>
      <div className="user-menu-container" ref={dropdownRef}>
        <div className="user-menu" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <User size={18} />
          <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>User</span>
          <ChevronDown size={18} />
        </div>
        {isDropdownOpen && (
          <div className="user-dropdown">
            <a href="/live">Start Live Web</a>
            <a href="/upload">Your Library Upload</a>
            <a href="/analysis">Data Analysis</a>
            <a href="/settings">Settings</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;