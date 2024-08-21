import React from 'react';

const instruments = [
  { name: 'Unison', icon: '/path/to/unison-icon.svg' },
  { name: 'Vocal', icon: '/path/to/vocal-icon.svg' },
  { name: 'Woodwind', icon: '/path/to/woodwind-icon.svg' },
  { name: 'Uncategorized', icon: '/path/to/uncategorized-icon.svg' },
  { name: 'Arpeggio', icon: '/path/to/arpeggio-icon.svg' },
  { name: 'Bass', icon: '/path/to/bass-icon.svg' },
  { name: 'Bells', icon: '/path/to/bells-icon.svg' },
  { name: 'Brass', icon: '/path/to/brass-icon.svg' },
  // Add more instruments as needed
];

const InstrumentSubmenu = ({ selectedInstrument, onSelectInstrument }) => {
  return (
    <div className="sub-menu">
      {instruments.map((instrument) => (
        <button
          key={instrument.name}
          className={`sub-menu-item ${selectedInstrument === instrument.name ? 'active' : ''}`}
          onClick={() => onSelectInstrument(instrument.name)}
        >
          <div className="sub-menu-item-content">
            <img src={instrument.icon} alt={instrument.name} className="sub-menu-icon" />
            <span className="sub-menu-text">{instrument.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default InstrumentSubmenu;