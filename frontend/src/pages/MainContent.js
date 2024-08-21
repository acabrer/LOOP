import React, { useState } from 'react';
import Submenu from '../components/Submenu';
import InstrumentSubmenu from '../components/InstrumentSubmenu';
import { Plus, Heart, Ban } from 'lucide-react';

function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  const renderCard = (title, description) => (
    <div className="card">
      <img src={`https://picsum.photos/200/150?random=${Math.random()}`} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );

  const renderFeed = (title, items) => (
    <section className="content-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <a href="#" className="view-all">View all</a>
      </div>
      <div className="card-scroll">
        {items.map((item, i) => renderCard(item.title, item.description))}
      </div>
    </section>
  );

  const renderMostListened = () => (
    <section className="content-section">
      <div className="section-header">
        <h2 className="section-title">Most Listened Today</h2>
        <a href="#" className="view-all">View all</a>
      </div>
      <div className="most-listened-table">
        <div className="table-header">
          <span>TITLE</span>
          <span>ARTIST</span>
          <span>KEY</span>
          <span>BPM</span>
          <span>CATEGORY</span>
          <span>TIME</span>
          <span></span>
        </div>
        {mostListenedData.map((item, index) => (
          <div key={index} className="table-row">
            <span className="song-info">
              <img src={item.image} alt={item.title} className="song-image" />
              <span>{item.title}</span>
            </span>
            <span>{item.artist}</span>
            <span>{item.key}</span>
            <span>{item.bpm}</span>
            <span>{item.category}</span>
            <span>{item.time}</span>
            <span className="action-buttons">
              <Plus size={18} />
              <Heart size={18} />
              <Ban size={18} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContent = () => {
    if (selectedCategory === 'Instruments' && selectedInstrument) {
      return renderFeed(`Instruments: ${selectedInstrument}`, 
        [...Array(10)].map((_, i) => ({
          title: `${selectedInstrument} ${i + 1}`,
          description: `Instruments - ${selectedInstrument} item ${i + 1}`
        }))
      );
    }

    return (
      <>
        {renderFeed('Tailored for You', 
          [...Array(10)].map((_, i) => ({
            title: `Tailored ${i + 1}`,
            description: `Tailored for you item ${i + 1}`
          }))
        )}
        {renderFeed('New Arrivals', 
          [...Array(10)].map((_, i) => ({
            title: `New Arrival ${i + 1}`,
            description: `New arrival item ${i + 1}`
          }))
        )}
        {renderMostListened()}
      </>
    );
  };

  return (
    <main className="main-content">
      <Submenu 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
      />
      {selectedCategory === 'Instruments' && (
        <InstrumentSubmenu
          selectedInstrument={selectedInstrument}
          onSelectInstrument={setSelectedInstrument}
        />
      )}
      {renderContent()}
    </main>
  );
}

const getRandomKey = () => {
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const modes = ['maj', 'min'];
  return `${keys[Math.floor(Math.random() * keys.length)]} ${modes[Math.floor(Math.random() * modes.length)]}`;
};

const getRandomBPM = () => Math.floor(Math.random() * (180 - 60 + 1) + 60);

const getRandomCategory = () => {
  const categories = ['Hip-hop', 'EDM', 'Pop', 'Rock', 'R&B', 'Jazz', 'Classical', 'Folk'];
  return categories[Math.floor(Math.random() * categories.length)];
};

const mostListenedData = [
  { image: 'https://picsum.photos/40/40?random=1', title: 'My Friend the Forest', artist: 'Nils Frahm', key: getRandomKey(), bpm: getRandomBPM(), category: getRandomCategory(), time: '5:16' },
  { image: 'https://picsum.photos/40/40?random=2', title: 'Bardo', artist: 'GoGo Penguin', key: getRandomKey(), bpm: getRandomBPM(), category: getRandomCategory(), time: '7:14' },
  { image: 'https://picsum.photos/40/40?random=3', title: 'nyepi', artist: 'Ólafur Arnalds', key: getRandomKey(), bpm: getRandomBPM(), category: getRandomCategory(), time: '4:14' },
  { image: 'https://picsum.photos/40/40?random=4', title: 'Blais: outsiders (Edit)', artist: 'Jean-Michel Blais', key: getRandomKey(), bpm: getRandomBPM(), category: getRandomCategory(), time: '4:42' },
  { image: 'https://picsum.photos/40/40?random=5', title: 'Human Range', artist: 'Nils Frahm', key: getRandomKey(), bpm: getRandomBPM(), category: getRandomCategory(), time: '6:59' },
  { image: 'https://picsum.photos/40/40?random=6', title: 'With All My Love', artist: 'Melanie De Biasio', key: getRandomKey(), bpm: getRandomBPM(), category: getRandomCategory(), time: '8:24' },
  { image: 'https://picsum.photos/40/40?random=7', title: 'Prayer', artist: 'GoGo Penguin', key: getRandomKey(), bpm: getRandomBPM(), category: getRandomCategory(), time: '2:54' },
];

export default MainContent;
