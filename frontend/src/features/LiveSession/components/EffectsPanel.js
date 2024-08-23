import React, { useState, useEffect, useCallback } from 'react';
import { useLiveSession } from '../context/LiveSessionContext';
import { Button } from '../../../components/common'; // Adjust the import path as needed

const EffectsPanel = ({ trackIndex }) => {
  const { tracks, setTrackEffect } = useLiveSession();
  const track = tracks[trackIndex];

  const [reverbEnabled, setReverbEnabled] = useState(false);
  const [reverbAmount, setReverbAmount] = useState(0.5);
  const [delayEnabled, setDelayEnabled] = useState(false);
  const [delayTime, setDelayTime] = useState(0.3);
  const [delayFeedback, setDelayFeedback] = useState(0.5);
  const [eqEnabled, setEqEnabled] = useState(false);
  const [lowGain, setLowGain] = useState(0);
  const [midGain, setMidGain] = useState(0);
  const [highGain, setHighGain] = useState(0);

  useEffect(() => {
    // Initialize effect states from track data
    if (track.effects) {
      setReverbEnabled(track.effects.reverb?.enabled || false);
      setReverbAmount(track.effects.reverb?.amount || 0.5);
      setDelayEnabled(track.effects.delay?.enabled || false);
      setDelayTime(track.effects.delay?.time || 0.3);
      setDelayFeedback(track.effects.delay?.feedback || 0.5);
      setEqEnabled(track.effects.eq?.enabled || false);
      setLowGain(track.effects.eq?.low || 0);
      setMidGain(track.effects.eq?.mid || 0);
      setHighGain(track.effects.eq?.high || 0);
    }
  }, [track.effects]);

  const updateEffect = useCallback((effectType, params) => {
    setTrackEffect(trackIndex, effectType, params);
  }, [trackIndex, setTrackEffect]);

  return (
    <div className="effects-panel">
      <h3>Track {trackIndex + 1} Effects</h3>
      
      <div className="effect-section">
        <h4>Reverb</h4>
        <label>
          <input
            type="checkbox"
            checked={reverbEnabled}
            onChange={(e) => {
              setReverbEnabled(e.target.checked);
              updateEffect('reverb', { enabled: e.target.checked, amount: reverbAmount });
            }}
          />
          Enable Reverb
        </label>
        <label>
          Amount:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={reverbAmount}
            onChange={(e) => {
              setReverbAmount(parseFloat(e.target.value));
              updateEffect('reverb', { enabled: reverbEnabled, amount: parseFloat(e.target.value) });
            }}
          />
        </label>
      </div>

      <div className="effect-section">
        <h4>Delay</h4>
        <label>
          <input
            type="checkbox"
            checked={delayEnabled}
            onChange={(e) => {
              setDelayEnabled(e.target.checked);
              updateEffect('delay', { enabled: e.target.checked, time: delayTime, feedback: delayFeedback });
            }}
          />
          Enable Delay
        </label>
        <label>
          Time:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={delayTime}
            onChange={(e) => {
              setDelayTime(parseFloat(e.target.value));
              updateEffect('delay', { enabled: delayEnabled, time: parseFloat(e.target.value), feedback: delayFeedback });
            }}
          />
        </label>
        <label>
          Feedback:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={delayFeedback}
            onChange={(e) => {
              setDelayFeedback(parseFloat(e.target.value));
              updateEffect('delay', { enabled: delayEnabled, time: delayTime, feedback: parseFloat(e.target.value) });
            }}
          />
        </label>
      </div>

      <div className="effect-section">
        <h4>EQ</h4>
        <label>
          <input
            type="checkbox"
            checked={eqEnabled}
            onChange={(e) => {
              setEqEnabled(e.target.checked);
              updateEffect('eq', { enabled: e.target.checked, low: lowGain, mid: midGain, high: highGain });
            }}
          />
          Enable EQ
        </label>
        <label>
          Low:
          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={lowGain}
            onChange={(e) => {
              setLowGain(parseInt(e.target.value));
              updateEffect('eq', { enabled: eqEnabled, low: parseInt(e.target.value), mid: midGain, high: highGain });
            }}
          />
        </label>
        <label>
          Mid:
          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={midGain}
            onChange={(e) => {
              setMidGain(parseInt(e.target.value));
              updateEffect('eq', { enabled: eqEnabled, low: lowGain, mid: parseInt(e.target.value), high: highGain });
            }}
          />
        </label>
        <label>
          High:
          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={highGain}
            onChange={(e) => {
              setHighGain(parseInt(e.target.value));
              updateEffect('eq', { enabled: eqEnabled, low: lowGain, mid: midGain, high: parseInt(e.target.value) });
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default EffectsPanel;