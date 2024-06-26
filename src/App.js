// App.js
import './style/App.css';
import Site from "./pages/Site";
import MentionLegals from "./pages/MentionLegals";
import Inventory from "./pages/Inventory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoSite from "./pages/NoSite";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

function App() {
 return (
    <div className="App">
      <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Site />} />
            <Route path="legals" element={<MentionLegals />} />
            <Route path="login" element={<Login />} />
            <Route path="/inventory" element={<Inventory/>}/>
            {/*<Route path="/inventory" element={<ProtectedRoute element={<Inventory/>}/>}/>*/}
            <Route path="*" element={<NoSite />} />
          </Routes>
        </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </div>
 );
}

export default App;
