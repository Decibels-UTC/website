import { motion } from "framer-motion"
import Footer from "../components/Footer"
import Legals from "../components/Legals";
import decibels from "../ressources/decibels.png";


function MentionLegals(){
    return(<>
            <a href={"/"}><motion.img
                initial={{opacity: 0, scale: 0.7}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 1.5}}
                src={decibels} className={"logo-legals"}>
            </motion.img></a>

            <Legals/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </>
    );
}
export default MentionLegals;