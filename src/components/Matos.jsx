import { motion } from "framer-motion"
import TableData from "./TableData";
import '../style/Matos.css'


function Matos(){


    return(<>
            <div>
                <h1>Notre matériel : </h1>
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