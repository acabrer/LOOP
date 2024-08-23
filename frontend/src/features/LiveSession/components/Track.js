import React, { useState } from 'react';
import { useLiveSession } from '../context/LiveSessionContext';
import { Button } from '../../../components/common';
import LoopBrowser from './LoopBrowser';
import EffectsPanel from './EffectsPanel';
import styles from './LiveSession.module.css';

const Track = ({ index }) => {
  const { 
    tracks, 
    playTrack, 
    stopTrack, 
    setTrackVolume, 
    setTrackPan 
  } = useLiveSession();
  
  const [isLoopBrowserOpen, setIsLoopBrowserOpen] = useState(false);
  const [isEffectsPanelOpen, setIsEffectsPanelOpen] = useState(false);
  
  const track = tracks[index];

  const handleVolumeChange = (e) => {
    setTrackVolume(index, parseFloat(e.target.value));
  };

  const handlePanChange = (e) => {
    setTrackPan(index, parseFloat(e.target.value));
  };

  return (
    <div className={styles.track}>
      <div className={styles['track-header']}>
        <Button 
          onClick={() => track.isPlaying ? stopTrack(index) : playTrack(index)}
          className={`${styles['play-button']} ${track.isPlaying ? styles.playing : ''}`}
        >
          {track.isPlaying ? 'Stop' : 'Play'}
        </Button>
        <span className={styles['track-name']}>Track {index + 1}</span>
      </div>
      
      <div className={styles['loop-info']}>
        {track.loop ? track.loop.name : 'No loop selected'}
      </div>
      
      <Button 
        onClick={() => setIsLoopBrowserOpen(true)} 
        className={styles['select-loop-button']}
      >
        Select Loop
      </Button>
      
      {isLoopBrowserOpen && (
        <LoopBrowser 
          trackIndex={index} 
          onClose={() => setIsLoopBrowserOpen(false)} 
        />
      )}
      
      <Button 
        onClick={() => setIsEffectsPanelOpen(!isEffectsPanelOpen)} 
        className={styles['effects-button']}
      >
        {isEffectsPanelOpen ? 'Close Effects' : 'Open Effects'}
      </Button>
      
      {isEffectsPanelOpen && (
        <EffectsPanel trackIndex={index} />
      )}
      
      <div className={styles['track-controls']}>
        <label className={styles['volume-control']}>
          Volume:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={track.volume}
            onChange={handleVolumeChange}
          />
        </label>
        
        <label className={styles['pan-control']}>
          Pan:
          <input
            type="range"
            min="-1"
            max="1"
            step="0.01"
            value={track.pan}
            onChange={handlePanChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Track;