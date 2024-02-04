import './style/App.css';
import Site from "./pages/Site";
import MentionLegals from "./pages/MentionLegals";
import Inventory from "./pages/Inventory";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoSite from "./pages/NoSite";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Site />} />
          <Route path="legals" element={<MentionLegals />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="*" element={<NoSite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

