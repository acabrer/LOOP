import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Radio, Folder } from 'lucide-react';

function Sidebar() {
  return (
    <nav className="sidebar">
      <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Your Sounds</h3>
      <Link to="/live-feeds" className="nav-link">
        <Radio className="nav-link-icon" size={18} />
        Live Feeds
      </Link>
      <Link to="/folders" className="nav-link">
        <Folder className="nav-link-icon" size={18} />
        Folders
      </Link>
      <Link to="/your-music" className="nav-link">
        <Music className="nav-link-icon" size={18} />
        Your Music
      </Link>
    </nav>
  );
}

export default Sidebar;
