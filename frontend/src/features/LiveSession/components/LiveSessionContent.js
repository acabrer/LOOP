import React from 'react';
import { useLiveSession } from '../context/LiveSessionContext';
import Track from './Track';
import MixerPanel from './MixerPanel';
import { Button } from '../../../components/common'; // Adjust the import path as needed

const LiveSessionContent = () => {
  const { tracks, bpm, setBpm } = useLiveSession();

  return (
    <div className="live-session-content">
      <h1>Live Session</h1>
      
      <div className="global-controls">
        <label className="bpm-control">
          BPM:
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value, 10))}
            min="60"
            max="200"
          />
        </label>
        <Button className="start-session-button">Start Session</Button>
      </div>

      <div className="tracks-container">
        {tracks.map((_, index) => (
          <Track key={index} index={index} />
        ))}
      </div>

      <MixerPanel />

      <div className="session-controls">
        <Button className="save-session-button">Save Session</Button>
        <Button className="export-session-button">Export Session</Button>
      </div>
    </div>
  );
};

export default LiveSessionContent;