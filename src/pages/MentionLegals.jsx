import { motion } from "framer-motion"
import Footer from "../components/Footer"
import Legals from "../components/Legals";
import decibels from "../ressources/decibels.png";


function MentionLegals(){
    return(<>
            <a href={"/"}><motion.img src={decibels} className={"logo-legals"}>
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