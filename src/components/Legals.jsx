import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";
import { motion } from "framer-motion"
import '../style/Legals.css'


function Legals(){
    return(
        <>
            <div className={"main-content-legals"} >


            <div className={"main-content-legals-1"}>
                <h1 className={"title legals-title"}>Mentions légales</h1>
            </div>
            <div className={"main-content-legals-2"}>
                <motion.div className={"container text-legals"}
                whileHover={{scale : 1.1}}
                >
                    <h1>Politique de confidentialité</h1>
                    <p>Cookies :</p>
                  </motion.div>
            </div>

            <div className={"main-content-legals-3"}>
                <motion.img
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 2}}
                src={item2} className={"item-son-legals"} >
                </motion.img>
            </div>

            </div>
        </>
    );
}

export default Legals;
