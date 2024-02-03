import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";
import vid1 from "../ressources/vid1.mp4";
import onde2 from "../ressources/animations/onde2.gif";
import { motion } from "framer-motion"
import '../style/Son.css'
import VideoComponent from "./Video";
import video from "./Video";


function Son(){
    return(
        <div className="page-son">
            <h1 className={"title son-title"}>Son</h1>
            <div className={"text-middle"}>
                <div className={"text-son-div"}>
                    <motion.div className={"container text-son"}
                    whileHover={{scale : 1.1}}
                    >
                    <h1></h1>
                    <p>Décibels c'est de la technique du son</p>
                  </motion.div>
                </div>

                <motion.div className={"vid1"}
                            initial={{x: 50, opacity: 0.5, scale: 1, rotate: 0}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
                >
                    <VideoComponent src={vid1} width={"50%"} height={"auto"}/>
                </motion.div>
            </div>
            <motion.div
                initial={{x: 150, opacity: 0.2, scale: 1, rotate: 0}}
                whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                viewport={{once: true}}
                transition={{duration: 3}}
                className={"son-div"}
            >
                <img src={item2} className={"son"}/>
            </motion.div>

            <div className={"item1-son-container"}>
                <motion.img src={item1} className={"item1-son"}
                            initial={{x: 150, opacity: 0.8, scale: 1, rotate: 90}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 90}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
                ></motion.img>
            </div>

            <div className={"son-onde2-div"}>
                <motion.img   src={onde2} className={"son-onde2"}>
                </motion.img>
            </div>

        </div>
    );
}

export default Son;
