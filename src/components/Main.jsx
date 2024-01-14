
import { motion } from "framer-motion"

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

              <motion.img src={item1} className={"image-mic1"}
                initial={{ y:-300, opacity: 0.5, scale: 1 }}
                animate={{ y:0,opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              ></motion.img>


              <img className={"image-flyht"} src={item4} />
          </div>


          <div className={"content-middle"}>
              <motion.img src={item5} className={"item5-first"}
                 initial={{ x:-500, opacity: 0.5, scale: 1 }}
                animate={{ x:0,opacity: 0.8, scale: 1 }}
                transition={{ duration: 2 }}
              >
              </motion.img>
          <div>
              <motion.img className={"img-dbs"} src={decibels}

              ></motion.img>
          </div>
              <motion.img src={item5} className={"item5-second"}
                          initial={{ x:500, opacity: 0.5, scale: 1 }}
                animate={{ x:0,opacity: 0.8, scale: 1 }}
                transition={{ duration: 2 }}
              ></motion.img>
          </div>

        <div className={"item1-fourth-container"}>
            <motion.img src={item1} className={"item1-fourth"}
                initial={{ x:300, opacity: 0.5, scale: 1, rotate: 90 }}
                animate={{ x:0,opacity: 1, scale: 1, rotate: 90 }}
                transition={{ duration: 2 }}

            ></motion.img>
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
