import bde from "../ressources/bde.png"
import utc from "../ressources/utc.png"
import insta from "../ressources/insta.png"
import mail from "../ressources/mail.png";

import  '../style/Footer.css'

function Footer(){
    return(

                <div className={"wrapper"}>


                        <div>
                            <a href={"https://utc.fr"}> <img src={utc} className={"img-footer-utc"} /></a>
                        </div>
                        <div>
                            <a href={"https://assos.utc.fr"}><img src={bde} className={"img-footer-bde"} /></a>
                        </div>



                        <div>
                            <p className={"footer-info"} >@2023 PAE - Decibels</p>
                        </div>
                        <div>
                            <a href={"/legals"}><p className={"footer-info"} >mention légales</p></a>
                        </div>


                        <div>
                             <a href={"https://www.instagram.com/dbsutc/?hl=fr"}><img src={insta} className={"img-socials"} /></a>
                         </div>
                         <div>
                             <a href={"mailto://decibels@assos.utc.fr"}><img src={mail} className={"img-socials"} /></a>
                         </div>


                </div>

    );
}
export default Footer;