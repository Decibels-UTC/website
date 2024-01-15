import './style/App.css';

import Footer from "./components/Footer"
import Son from "./components/Son.jsx";
import Main from "./components/Main";
import Desc from "./components/Desc"
import Lights from "./components/Lights";
import Legals from "./components/Legals";


function App() {
  return (
    <div className="App">
        <Main/>
        <Desc/>
        <Son/>
        <Lights/>
        <Footer/>
    </div>
  );
}

export default App;
