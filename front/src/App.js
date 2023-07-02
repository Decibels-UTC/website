import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Portefolio from './pages/Portefolio';
import NavBar from './components/NavBar';
import Contact from "./pages/Contact";
import Anciens from "./pages/Anciens";
import Matos from "./pages/Matos";

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portefolio" element={<Portefolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/anciens" element={<Anciens />} />
          <Route path="/matos" element={<Matos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;