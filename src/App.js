import './style/App.css';
import Footer from "./components/Footer"
import Son from "./pages/Son.jsx";
import Main from "./pages/Main";
import Desc from "./pages/Desc"
import Lights from "./pages/Lights";
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Main/>
          <Desc/>
          <Son/>
          <Lights/>
      </header>
    </div>
  );
}

export default App;
