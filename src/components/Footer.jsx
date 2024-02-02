import React from "react";
import bde from "../ressources/bde.png";
import utc from "../ressources/utc.png";
import insta from "../ressources/insta.png";
import mail from "../ressources/mail.png";
import '../style/Footer.css';

function Footer() {
    return (
        <div className={"wrapper"}>
            <div className={"footer-item"}>
                <a href={"https://utc.fr"}><img src={utc} className={"img-footer-utc"} /></a>
            </div>
            <div className={"footer-item"}>
                <a href={"https://assos.utc.fr"}><img src={bde} className={"img-footer-bde"} /></a>
            </div>
            <div className={"footer-item"}>
                <a href={"/"}><p className={"footer-info"}>@2023 PAE - Decibels</p></a>
            </div>
            <div className={"footer-item"}>
                <a href={"/legals"}><p className={"footer-info"} >mentions légales</p></a>
            </div>
            <div className={"footer-item"}>
                <a href={"https://www.instagram.com/dbsutc/?hl=fr"}><img src={insta} className={"img-socials"} /></a>
            </div>
            <div className={"footer-item"}>
                <a href={"mailto://decibels@assos.utc.fr"}><img src={mail} className={"img-socials"} /></a>
            </div>
        </div>
    );
}

export default Footer;
