import Container from "./Container";
import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";
import { motion } from "framer-motion"
import '../style/Son.css'


function Son(){
    return(
        <div className="page-son">
            <h1 className={"title son-title"}>Son</h1>
            <div className={"text-middle"}>
                <Container classname={"container"} height={600} width={600} text={"coucou"}/>
            </div>
            <div>
                <img src={item2} className={"item son"}  />
            </div>
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
