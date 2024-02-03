import item1 from "../ressources/item1.png";
import item3 from "../ressources/item3.png";
import { motion } from "framer-motion"
import '../style/Lights.css';
import VideoComponent from "./Video";
import vid2 from "../ressources/vid2.mp4";
import onde4 from "../ressources/animations/onde4.gif"

function Lights(){
    return(
        <>
            <div className={"title-lights-container"}>
                <h1 className={"title title-lights"} >Lumières</h1>
            </div>

            <div className={"text-middle-light"} >
                <motion.div className={"vid2"}
                            initial={{x: -200, opacity: 0.5, scale: 1, rotate: 0}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                            viewport={{once: true}}
                            transition={{duration: 3}}
                >

                   <VideoComponent className={"vid2-comp"} width={"100%"} height={"auto"} src={vid2} />
                </motion.div>
                <div className={"superpose-light"}>
                    <motion.img src={onde4} className={"light-onde4"}></motion.img>
                    <motion.div className={"container container-light"}
                    whileHover={{scale : 1.1}}
                    >
                    <h1></h1>
                    <p>Décibels c'est aussi de la lumière :</p>
                  </motion.div>

                </div>


            </div>


                <div className={"item1-light-first-container"}>
                <motion.img className={"item1-light-first"} src={item1}
                            initial={{x: -150, opacity: 0.8, scale: 1, rotate: -90}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: -90}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
                ></motion.img>
            </div>
            <div className={"item1-light-second-container"}>
                <motion.img className={"item1-light-second"} src={item1}
                            initial={{x: 150, opacity: 0.8, scale: 1, rotate: 90}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 90}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
                ></motion.img>
            </div>


            <div className={"item3-light-container"}>
                <img className={"item3-light"} src={item3}/>
            </div>



        </>
    );
}

export default Lights;
