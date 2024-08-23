import React from 'react';
import { LiveSessionProvider } from './context/LiveSessionContext';
import LiveSessionContent from './components/LiveSessionContent';

const LiveSessionPage = () => (
  <LiveSessionProvider>
    <LiveSessionContent />
  </LiveSessionProvider>
);

export default LiveSessionPage;
