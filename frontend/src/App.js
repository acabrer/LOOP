import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MainContent from './pages/MainContent';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-container">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </Router>
  );
}

export default App;
