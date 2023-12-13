import './style/App.css';

import Footer from "./components/Footer"
import Son from "./components/Son.jsx";
import Main from "./components/Main";
import Desc from "./components/Desc"
import Lights from "./components/Lights";


function App() {
  return (
    <div className="App">
        <Main />
        <Desc/>
        <Son />
        <Lights/>
        <footer>
            <Footer/>
        </footer>
    </div>
  );
}

export default App;
