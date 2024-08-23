import React from 'react';
import { useLiveSession } from '../context/LiveSessionContext';
import styles from './LiveSession.module.css';

const MixerPanel = () => {
  const { 
    tracks, 
    masterVolume, 
    setMasterVolume, 
    setTrackVolume, 
    setTrackPan 
  } = useLiveSession();

  const handleMasterVolumeChange = (e) => {
    setMasterVolume(parseFloat(e.target.value));
  };

  const handleTrackVolumeChange = (index, e) => {
    setTrackVolume(index, parseFloat(e.target.value));
  };

  const handleTrackPanChange = (index, e) => {
    setTrackPan(index, parseFloat(e.target.value));
  };

  return (
    <div className={styles['mixer-panel']}>
      <h2 className={styles['mixer-title']}>Mixer</h2>
      <div className={styles['master-volume']}>
        <label>
          Master Volume:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={masterVolume}
            onChange={handleMasterVolumeChange}
          />
        </label>
      </div>
      <div className={styles['tracks-mixer']}>
        {tracks.map((track, index) => (
          <div key={index} className={styles['track-mixer']}>
            <div className={styles['track-name']}>Track {index + 1}</div>
            <div className={styles['track-controls']}>
              <label className={styles['volume-control']}>
                Volume:
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={track.volume}
                  onChange={(e) => handleTrackVolumeChange(index, e)}
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
                  onChange={(e) => handleTrackPanChange(index, e)}
                />
              </label>
            </div>
            <div className={styles['track-meter']}>
              <div 
                className={styles['meter-fill']} 
                style={{height: `${track.volume * 100}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MixerPanel;
