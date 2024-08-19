import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Property from "./pages/Property";
import Item from "./components/Item";
import { ModalProvider } from "./store/ModalProvider";
import SharedProperty from "./components/SharedProperty";

function App() {
  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/property" element={<Property />} />
          <Route path="/item" element={<Item />} />
          <Route path="/shared/:token" element={<SharedProperty/>} />
        </Routes>
      </Router>
    </ModalProvider>
  );
}

export default App;
