
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Property from './components/Property';
import Item from './components/Item';


function App() {
 

  return (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/property" element={<Property />} />
        <Route path="/item" element={<Item />} />

      </Routes>
    </Router>
  </>
  );
}

export default App;
