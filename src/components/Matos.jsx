import { motion } from "framer-motion"
import TableData from "./TableData";
import '../style/Matos.css'
import LogoutButton from "./LogoutButton";
import {MenuItem, Menu, MenuMenu} from "semantic-ui-react";
import {useEffect, useState} from "react";
import HistoryTable from "./History";



function Matos(){
        const [activeItem, setActiveItem] = useState(() => {
            const savedActiveItem = localStorage.getItem('activeItem');
            return savedActiveItem || 'inventaire';
          });

          useEffect(() => {
            localStorage.setItem('activeItem', activeItem);
          }, [activeItem]);

     const handleItemClick = (e, { name }) => {
            setActiveItem(name);
     };


    return(<>
            <div className={"header-inventory"}>
                <h1>Gestion du matériel</h1>
                {/* menu*/}
                <Menu secondary>
                    <MenuItem
                        name='inventaire'
                        active={activeItem === 'inventaire'}
                        onClick={handleItemClick}
                    />
                    <MenuItem
                        name='historique'
                        active={activeItem === 'historique'}
                        onClick={handleItemClick}
                    />
                </Menu>
                <div>
                    <LogoutButton/>
                </div>

            </div>

            <div className={"table-data-wrapper"}>

                <div className={"table-data"}>
                    {activeItem === 'inventaire' ? <TableData/> : null}
                    {activeItem === 'historique' ? <HistoryTable/> : null}

                </div>
            </div>

        </>
    );

}
export default Matos;