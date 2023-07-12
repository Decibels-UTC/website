import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './pages/Home';
import Portefolio from './pages/Portefolio';
import NavBar from './components/NavBar';
import Contact from "./pages/Contact";
import Anciens from "./pages/Anciens";
import Matos from "./pages/Matos";

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <Router>
      <div>
        <NavBar activePageTrigger={activePage}/>

        <Routes>
          <Route path="/" element={<Home setPageCallback={setActivePage}/>} />
          <Route path="/portefolio" element={<Portefolio setPageCallback={setActivePage}/>} />
          <Route path="/contact" element={<Contact setPageCallback={setActivePage}/>} />
          <Route path="/anciens" element={<Anciens setPageCallback={setActivePage}/>} />
          <Route path="/matos" element={<Matos setPageCallback={setActivePage}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;