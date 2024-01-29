import Container from "./Container";
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
            <h1 className={"title title-lights"} >Lumières</h1>
            <div className={"text-middle text-middle-light"} >
                <motion.img src={onde4} className={"light-onde4"}></motion.img>
                <Container classname={"container-light"} height={300} width={400} text={"Décibels c'est aussi de la lumière : " + "\n" + ""}/>

            </div>

            <div>
                <motion.img className={"item item1-light-first"} src={item1}
                            initial={{x: 150, opacity: 0.8, scale: 1, rotate: 90}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 90}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
                ></motion.img>
            </div>
            <div>
                <motion.img className={"item item1-light-second"} src={item1}
                            initial={{x: -150, opacity: 0.8, scale: 1, rotate: -90}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: -90}}
                            viewport={{once: true}}
                            transition={{duration: 2}}
                ></motion.img>
            </div>

                <motion.div className={"vid2"}
                            initial={{x: -200, opacity: 0.5, scale: 1, rotate: 0}}
                            whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                            viewport={{once: true}}
                            transition={{duration: 3}}
                >


                <div>
                   <VideoComponent className={"vid2-comp"} width={"100%"} height={"auto"} src={vid2} />
                </div>

            </motion.div>

            <div>
                <img className={"item item3-light"} src={item3}/>
            </div>




        </>
    );
}

export default Lights;
