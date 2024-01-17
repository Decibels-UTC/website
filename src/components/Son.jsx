import Container from "./Container";
import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";
import vid1 from "../ressources/vid1.mp4";
import { motion } from "framer-motion"
import '../style/Son.css'
import VideoComponent from "./Video";
import video from "./Video";


function Son(){
    return(
        <div className="page-son">
            <h1 className={"title son-title"}>Son</h1>
            <div className={"text-middle"}>
                <Container classname={"text-son"} height={600} width={600} text={"Décibels c'est de la technique du son " + "\n"+
                    ""}/>
            </div>
            <motion.div
                        initial={{x: 150, opacity: 0.5, scale: 1, rotate: 0}}
                        whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                        viewport={{once: true}}
                        transition={{duration: 2}}
            >
                <img src={item2} className={"item son"}/>
        </motion.div>
        <motion.div className={"vid1"}
            initial={{x: 50, opacity: 0.5, scale: 1, rotate: 0}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
            >
                <VideoComponent  src={vid1} width={"38%"} height={"auto"}/>
        </motion.div>
            <div>
                <motion.img src={item1} className={"item item1-son"}
                            initial={{x: 150, opacity: 0.8, scale: 1, rotate: 90}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 90}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
                ></motion.img>
            </div>

        </div>
    );
}

export default Son;
