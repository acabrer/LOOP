import React, { useState, useEffect, useCallback } from 'react';
import { useLiveSession } from '../context/LiveSessionContext';
import { Button } from '../../../components/common'; // Adjust the import path as needed
import styles from './LiveSession.module.css';

const LoopBrowser = ({ trackIndex, onClose }) => {
  const { setLoop } = useLiveSession();
  const [loops, setLoops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewAudio, setPreviewAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulated loop data - replace this with actual API call in a real application
  useEffect(() => {
    const fetchLoops = async () => {
      // Simulated API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve([
          { id: 1, name: 'Drum Loop 1', category: 'Drums', bpm: 120, url: '/audio/drum-loop-1.mp3' },
          { id: 2, name: 'Bass Line 1', category: 'Bass', bpm: 120, url: '/audio/bass-line-1.mp3' },
          { id: 3, name: 'Guitar Riff 1', category: 'Guitar', bpm: 120, url: '/audio/guitar-riff-1.mp3' },
          { id: 4, name: 'Synth Melody 1', category: 'Synth', bpm: 120, url: '/audio/synth-melody-1.mp3' },
          { id: 5, name: 'Drum Loop 2', category: 'Drums', bpm: 140, url: '/audio/drum-loop-2.mp3' },
          { id: 6, name: 'Bass Line 2', category: 'Bass', bpm: 140, url: '/audio/bass-line-2.mp3' },
        ]), 500)
      );
      setLoops(response);
    };

    fetchLoops();
  }, []);

  const categories = ['All', ...new Set(loops.map(loop => loop.category))];

  const filteredLoops = loops.filter(loop => 
    (selectedCategory === 'All' || loop.category === selectedCategory) &&
    loop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoopSelect = (loop) => {
    setLoop(trackIndex, loop);
    onClose();
  };

  const handlePreview = useCallback((loop) => {
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
    }

    const audio = new Audio(loop.url);
    audio.loop = true;
    setPreviewAudio(audio);
    
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  }, [previewAudio]);

  const stopPreview = useCallback(() => {
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [previewAudio]);

  useEffect(() => {
    return () => {
      if (previewAudio) {
        previewAudio.pause();
        previewAudio.currentTime = 0;
      }
    };
  }, [previewAudio]);

  return (
    <div className={styles['loop-browser']}>
      <h2 className={styles['loop-browser-title']}>Select a Loop</h2>
      <div className={styles['loop-browser-controls']}>
        <input
          type="text"
          placeholder="Search loops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles['loop-search']}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles['category-select']}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className={styles['loop-list']}>
        {filteredLoops.map(loop => (
          <div key={loop.id} className={styles['loop-item']}>
            <span>{loop.name}</span>
            <span>{loop.category}</span>
            <span>{loop.bpm} BPM</span>
            <Button onClick={() => isPlaying ? stopPreview() : handlePreview(loop)}>
              {isPlaying ? 'Stop' : 'Preview'}
            </Button>
            <Button onClick={() => handleLoopSelect(loop)}>Select</Button>
          </div>
        ))}
      </div>
      <Button onClick={onClose} className={styles['close-button']}>Close</Button>
    </div>
  );
};

export default LoopBrowser;
