import React from "react";
import bde from "../ressources/bde.png";
import utc from "../ressources/utc.png";
import insta from "../ressources/insta.png";
import mail from "../ressources/mail.png";
import '../style/Footer.css';
import { motion } from "framer-motion"


function Footer() {
    return (
        <div className={"wrapper"}>
            <motion.div className={"footer-item"}
            whileHover={{scale : 1.05}}
            >
                <a href={"https://utc.fr"}><img src={utc} className={"img-footer-utc"} /></a>
            </motion.div>
            <motion.div className={"footer-item"}
            whileHover={{scale : 1.05}}
            >
                <a href={"https://assos.utc.fr"}><img src={bde} className={"img-footer-bde"} /></a>
            </motion.div>
            <motion.div className={"footer-item"}
            whileHover={{scale : 1.05}}
            >
                <a href={"/"}><p className={"footer-info"}>@2023 PAE - Decibels</p></a>
            </motion.div>
            <motion.div className={"footer-item"}
            whileHover={{scale : 1.05}}
            >
                <a href={"/legals"}><p className={"footer-info"} >mentions légales</p></a>
            </motion.div>
            <motion.div className={"footer-item"}
            whileHover={{scale : 1.05}}
            >
                <a href={"https://www.instagram.com/dbsutc/?hl=fr"}><img src={insta} className={"img-socials"} /></a>
            </motion.div>
            <motion.div className={"footer-item"}
            whileHover={{scale : 1.05}}
            >
                <a href={"mailto://decibels@assos.utc.fr"}><img src={mail} className={"img-socials"} /></a>
            </motion.div>
        </div>
    );
}

export default Footer;
