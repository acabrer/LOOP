import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useAudioEngine from '../hooks/useAudioEngine';

const LiveSessionContext = createContext();

export const useLiveSession = () => {
  const context = useContext(LiveSessionContext);
  if (!context) {
    throw new Error('useLiveSession must be used within a LiveSessionProvider');
  }
  return context;
};

export const LiveSessionProvider = ({ children }) => {
  const [tracks, setTracks] = useState(Array(8).fill({ isPlaying: false, loop: null, volume: 1, pan: 0 }));
  const [masterVolume, setMasterVolume] = useState(1);
  const [bpm, setBpm] = useState(120);

  const {
    loadAudio,
    createTrack,
    playTrack,
    stopTrack,
    setTrackVolume,
    setTrackPan,
    setMasterVolume: setAudioMasterVolume,
    setTrackEffect: setAudioTrackEffect,
  } = useAudioEngine();

  useEffect(() => {
    // Initialize tracks
    tracks.forEach((_, index) => createTrack(index));
  }, [createTrack]);

  const updateTrack = useCallback((index, updates) => {
    setTracks(prevTracks => prevTracks.map((track, i) => 
      i === index ? { ...track, ...updates } : track
    ));
  }, []);

  const handlePlayTrack = useCallback(async (index) => {
    const track = tracks[index];
    if (!track.loop) return;

    if (!track.audioBuffer) {
      const buffer = await loadAudio(track.loop.url);
      updateTrack(index, { audioBuffer: buffer });
    }

    playTrack(index, track.audioBuffer, true);
    updateTrack(index, { isPlaying: true });
  }, [tracks, loadAudio, playTrack, updateTrack]);

  const handleStopTrack = useCallback((index) => {
    stopTrack(index);
    updateTrack(index, { isPlaying: false });
  }, [stopTrack, updateTrack]);


  const handleSetLoop = useCallback(async (index, loop) => {
    // Load the audio buffer when the loop is set
    const buffer = await loadAudio(loop.url);
    updateTrack(index, { loop, audioBuffer: buffer });
  }, [loadAudio, updateTrack]);

  const handleSetTrackVolume = useCallback((index, volume) => {
    setTrackVolume(index, volume);
    updateTrack(index, { volume });
  }, [setTrackVolume, updateTrack]);

  const handleSetTrackPan = useCallback((index, pan) => {
    setTrackPan(index, pan);
    updateTrack(index, { pan });
  }, [setTrackPan, updateTrack]);

  const handleSetMasterVolume = useCallback((volume) => {
    setAudioMasterVolume(volume);
    setMasterVolume(volume);
  }, [setAudioMasterVolume]);

  const handleSetTrackEffect = useCallback((index, effectType, params) => {
    setAudioTrackEffect(index, effectType, params);
    updateTrack(index, { 
      effects: { 
        ...tracks[index].effects, 
        [effectType]: params 
      } 
    });
  }, [setAudioTrackEffect, updateTrack, tracks]);

  const value = {
    tracks,
    masterVolume,
    bpm,
    setMasterVolume: handleSetMasterVolume,
    setBpm,
    playTrack: handlePlayTrack,
    stopTrack: handleStopTrack,
    setLoop: handleSetLoop,
    setTrackVolume: handleSetTrackVolume,
    setTrackPan: handleSetTrackPan,
    setTrackEffect: handleSetTrackEffect,
  };

  return <LiveSessionContext.Provider value={value}>{children}</LiveSessionContext.Provider>;
};