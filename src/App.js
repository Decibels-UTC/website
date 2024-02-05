// App.js
import './style/App.css';
import Site from "./pages/Site";
import MentionLegals from "./pages/MentionLegals";
import Inventory from "./pages/Inventory";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoSite from "./pages/NoSite";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import {ModalProvider} from "./context/ModalComponent";

function App() {
 return (
    <div className="App">
      <AuthProvider>
       <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Site />} />
            <Route path="legals" element={<MentionLegals />} />
            <Route path="login" element={<Login />} />
            <Route path="/inventory" element={<ProtectedRoute element={<Inventory/>}/>}/>
            <Route path="*" element={<NoSite />} />
          </Routes>
        </BrowserRouter>
       </ModalProvider>
      </AuthProvider>
    </div>
 );
}

export default App;
