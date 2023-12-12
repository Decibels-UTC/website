import bde from "../ressources/bde.png"
import utc from "../ressources/utc.png"
import insta from "../ressources/insta.png"
import mail from "../ressources/mail.png";

function Footer(){
    return(

            <Footer>
                <div>
                    <div>
                        <div>
                        <img src={utc} />
                    </div>
                    <div>
                        <h1>Contact</h1>
                    </div>
                    <div>
                        <img src={bde} />
                    </div>
                     </div>

                     <div>
                         <div>
                             <img src={insta}><a href={"https://instagram.com"}></a></img>
                         </div>
                         <div>
                             <img src={mail}><a href={"mailto://decibels@assos.utc.fr"}></a></img>
                         </div>
                     </div>

                    <div>
                        <div>
                            <p>@2023 PAE - Decibels</p>
                        </div>
                        <div>
                            <a href={"/legals"}><p>mention légales</p></a>
                        </div>
                        <div>
                            <a href={"https://assos.utc.fr/picsart"} ><p>crédits photo : Picsart UTC</p></a>
                        </div>
                    </div>
                </div>

            </Footer>
    );
}
export default Footer;