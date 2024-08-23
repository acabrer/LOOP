import React from 'react';
import { useLiveSession } from '../context/LiveSessionContext';
import Track from './Track';
import MixerPanel from './MixerPanel';
import { Button } from '../../../components/common';
import styles from './LiveSession.module.css';

const LiveSessionContent = () => {
  const { tracks, bpm, setBpm } = useLiveSession();

  return (
    <div className={styles['live-session-content']}>
      <h1 className={styles['session-title']}>Live Session</h1>
      
      <div className={styles['global-controls']}>
        <label className={styles['bpm-control']}>
          BPM:
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value, 10))}
            min="60"
            max="200"
          />
        </label>
        <Button className={styles['start-session-button']}>Start Session</Button>
      </div>

      <div className={styles['tracks-container']}>
        {tracks.map((_, index) => (
          <Track key={index} index={index} />
        ))}
      </div>

      <MixerPanel />

      <div className={styles['session-controls']}>
        <Button className={styles['save-session-button']}>Save Session</Button>
        <Button className={styles['export-session-button']}>Export Session</Button>
      </div>
    </div>
  );
};

export default LiveSessionContent;