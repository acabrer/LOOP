import React, { useState } from 'react';
import { useLiveSession } from '../context/LiveSessionContext';
import { Button } from '../../../components/common'; // Adjust the import path as needed
import LoopBrowser from './LoopBrowser';
import EffectsPanel from './EffectsPanel';

const Track = ({ index }) => {
  const { 
    tracks, 
    playTrack, 
    stopTrack, 
    setTrackVolume, 
    setTrackPan 
  } = useLiveSession();
  
  const [isLoopBrowserOpen, setIsLoopBrowserOpen] = useState(false);
  
  const track = tracks[index];

  const handleVolumeChange = (e) => {
    setTrackVolume(index, parseFloat(e.target.value));
  };

  const handlePanChange = (e) => {
    setTrackPan(index, parseFloat(e.target.value));
  };

  const [isEffectsPanelOpen, setIsEffectsPanelOpen] = useState(false);

  return (
    <div className="track">
      <div className="track-header">
        <Button 
          onClick={() => track.isPlaying ? stopTrack(index) : playTrack(index)}
          className={`play-button ${track.isPlaying ? 'playing' : ''}`}
        >
          {track.isPlaying ? 'Stop' : 'Play'}
        </Button>
        <span className="track-name">Track {index + 1}</span>
      </div>
      
      <div className="loop-info">
        {track.loop ? track.loop.name : 'No loop selected'}
      </div>
      
      <Button onClick={() => setIsLoopBrowserOpen(true)} className="select-loop-button">
        Select Loop
      </Button>
      
      {isLoopBrowserOpen && (
        <LoopBrowser 
          trackIndex={index} 
          onClose={() => setIsLoopBrowserOpen(false)} 
        />
      )}
      
      <Button onClick={() => setIsEffectsPanelOpen(!isEffectsPanelOpen)} className="effects-button">
        {isEffectsPanelOpen ? 'Close Effects' : 'Open Effects'}
      </Button>
      
      {isEffectsPanelOpen && (
        <EffectsPanel trackIndex={index} />
      )}
      
      <div className="track-controls">
        <label className="volume-control">
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
        
        <label className="pan-control">
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