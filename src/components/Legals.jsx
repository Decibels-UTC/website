import Container from "./Container";
import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";
import { motion } from "framer-motion"
import '../style/Legals.css'


function Legals(){
    return(
        <div className="page-legals">
            <h1 className={"title legals-title"}>Mentions légales</h1>
            <div className={"text-middle-legals"}>
                <Container classname={"text-legals"} height={800} width={800} title={"Politique de confidentialité"} text={"Cookies : "+ "\n" +
                ""
                }/>
            </div>
            <div className={"div-son-legals"}>
                <motion.img
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 2}}
                src={item2} className={"item-son-legals"} >

                </motion.img>
            </div>


        </div>
    );
}

export default Legals;
