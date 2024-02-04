import { motion } from "framer-motion"
import Footer from "../components/Footer"
import Legals from "../components/Legals";
import decibels from "../ressources/decibels.png";
import Matos from "../components/Matos";
import ModalAdd from "../components/ModalAdd";


function Inventory(){
    return(<>

            <div className={"matos-content"}>
                <Matos/>
            </div>


            <Footer/>

        </>
    );
}
export default Inventory;