import { useState, useEffect, useCallback, useRef } from 'react';

const useAudioEngine = () => {
  const [context, setContext] = useState(null);
  const [masterGainNode, setMasterGainNode] = useState(null);
  const tracksRef = useRef({});

  useEffect(() => {
    const newContext = new (window.AudioContext || window.webkitAudioContext)();
    const newMasterGain = newContext.createGain();
    newMasterGain.connect(newContext.destination);
    
    setContext(newContext);
    setMasterGainNode(newMasterGain);

    return () => {
      newContext.close();
    };
  }, []);

  const loadAudio = useCallback(async (url) => {
    if (!context) return null;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }, [context]);

  const createTrack = useCallback((trackId) => {
    if (!context || !masterGainNode) return;

    const sourceNode = context.createBufferSource();
    const gainNode = context.createGain();
    const panNode = context.createStereoPanner();

    // Effect nodes
    const reverbNode = context.createConvolver();
    const delayNode = context.createDelay(5.0); // Maximum delay of 5 seconds
    const feedbackNode = context.createGain();
    const lowEqNode = context.createBiquadFilter();
    const midEqNode = context.createBiquadFilter();
    const highEqNode = context.createBiquadFilter();

    // Set up EQ nodes
    lowEqNode.type = 'lowshelf';
    lowEqNode.frequency.value = 320;
    midEqNode.type = 'peaking';
    midEqNode.frequency.value = 1000;
    midEqNode.Q.value = 0.5;
    highEqNode.type = 'highshelf';
    highEqNode.frequency.value = 3200;

    // Connect nodes
    sourceNode.connect(gainNode);
    gainNode.connect(panNode);
    panNode.connect(lowEqNode);
    lowEqNode.connect(midEqNode);
    midEqNode.connect(highEqNode);
    highEqNode.connect(delayNode);
    delayNode.connect(feedbackNode);
    feedbackNode.connect(delayNode);
    delayNode.connect(reverbNode);
    reverbNode.connect(masterGainNode);

    tracksRef.current[trackId] = { 
      sourceNode, gainNode, panNode, reverbNode, delayNode, 
      feedbackNode, lowEqNode, midEqNode, highEqNode 
    };
  }, [context, masterGainNode]);

  const playTrack = useCallback((trackId, buffer, loop = false) => {
    if (!context || !tracksRef.current[trackId]) return;

    const { sourceNode } = tracksRef.current[trackId];
    sourceNode.buffer = buffer;
    sourceNode.loop = loop;
    sourceNode.start();
  }, [context]);

  const stopTrack = useCallback((trackId) => {
    if (!tracksRef.current[trackId]) return;

    const { sourceNode } = tracksRef.current[trackId];
    sourceNode.stop();
    createTrack(trackId);  // Recreate the track for future playback
  }, [createTrack]);

  const setTrackVolume = useCallback((trackId, volume) => {
    if (!tracksRef.current[trackId]) return;

    const { gainNode } = tracksRef.current[trackId];
    gainNode.gain.setValueAtTime(volume, context.currentTime);
  }, [context]);

  const setTrackPan = useCallback((trackId, pan) => {
    if (!tracksRef.current[trackId]) return;

    const { panNode } = tracksRef.current[trackId];
    panNode.pan.setValueAtTime(pan, context.currentTime);
  }, [context]);

  const setMasterVolume = useCallback((volume) => {
    if (!masterGainNode) return;

    masterGainNode.gain.setValueAtTime(volume, context.currentTime);
  }, [context, masterGainNode]);

  const setTrackEffect = useCallback((trackId, effectType, params) => {
    if (!tracksRef.current[trackId]) return;

    const track = tracksRef.current[trackId];

    switch (effectType) {
      case 'reverb':
        if (params.enabled) {
          // You would typically load an impulse response here
          // For simplicity, we're just adjusting the wet/dry mix
          track.reverbNode.buffer = createImpulseResponse(params.amount);
        } else {
          track.reverbNode.buffer = null;
        }
        break;
      case 'delay':
        track.delayNode.delayTime.setValueAtTime(params.time, context.currentTime);
        track.feedbackNode.gain.setValueAtTime(params.feedback, context.currentTime);
        break;
      case 'eq':
        track.lowEqNode.gain.setValueAtTime(params.low, context.currentTime);
        track.midEqNode.gain.setValueAtTime(params.mid, context.currentTime);
        track.highEqNode.gain.setValueAtTime(params.high, context.currentTime);
        break;
    }
  }, [context]);

  // Helper function to create a simple impulse response for reverb
  const createImpulseResponse = (duration) => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const impulse = context.createBuffer(2, length, sampleRate);
    const leftChannel = impulse.getChannelData(0);
    const rightChannel = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = i / length;
      leftChannel[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, 2);
      rightChannel[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, 2);
    }

    return impulse;
  };

  return {
    loadAudio,
    createTrack,
    playTrack,
    stopTrack,
    setTrackVolume,
    setTrackPan,
    setMasterVolume,
    setTrackEffect,
  };
};

export default useAudioEngine;
