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
                <Container classname={"text-legals"} height={800} width={800} text={"coucou"}/>
            </div>
            <div className={"div-son-legals"}>
                <img src={item2} className={"item-son-legals"}  />
            </div>


        </div>
    );
}

export default Legals;
