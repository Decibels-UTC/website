import { motion } from "framer-motion"
import TableData from "./TableData";
import '../style/Matos.css'
import LogoutButton from "./LogoutButton";


function Matos(){


    return(<>
            <div className={"header-inventory"}>
                <h1>Notre matériel : </h1>
                <div>
                    <LogoutButton/>
                </div>
            </div>


            <div className={"table-data-wrapper"}>
            <div className={"table-data"}>
                <TableData/>
            </div>
            </div>

        </>
    );

}
export default Matos;