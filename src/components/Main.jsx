

import decibels from "../ressources/decibels.png";
import item6 from "../ressources/item6.png";
import item5 from "../ressources/item5.png";
import item4 from "../ressources/item4.png";
import item1 from "../ressources/item1.png";
import liveevent from "../ressources/live_event.png";
import recording from "../ressources/recording.png";

import style from "../style/Main.css";

function Main() {
  return (

      <div className={"main"}>

          <div className={"banner"}>
              <img src={item1} className={"image-mic1"}/>
              <img className={"image-flyht"} src={item4} />
          </div>


          <div className={"content-middle"}>
              <img src={item5} className={"item5-first"}/>
          <div>
              <img className={"img-dbs"} src={decibels}></img>
          </div>
          <img src={item5} className={"item5-second"} />
          </div>

        <div className={"item1-fourth-container"}>
            <img src={item1} className={"item1-fourth"} />
        </div>


          <div className={"footer-main-page"}>
              <div>
                  <img src={liveevent} className={"backpageimg"}/>
              </div>
              <div>
                  <img src={item5} className={"backpageimg"} />
              </div>
              <div>
                  <img src={recording} className={"backpageimg"} />
              </div>
          </div>

      </div>

  );
}

export default Main;
