import { motion } from "framer-motion"
import TableData from "./TableData";
import '../style/Matos.css'
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import {MenuItem, Menu, MenuMenu} from "semantic-ui-react";
import {useEffect, useState, useContext} from "react";
import HistoryTable from "./History";
import {AuthContext} from "../context/AuthContext";
import item4 from "../ressources/item4.png";




function Matos(){

    const {isAuthenticated} = useContext(AuthContext);
    

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

     function handleClickMain(){
        window.location.href = '/';
    }

    return(<>
            <div className={"header-inventory"}>
                <div className="top-left-wrapper">
                    <img className={"image-flyht"} src={item4}  onClick={handleClickMain} />
                    <h1>Gestion du matériel</h1>
                </div>
            
                {/* menu*/}
                <Menu secondary>

                    {isAuthenticated?
                    <>
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
                    </>
                    :null}
                </Menu>
                <div>
                    {isAuthenticated?<LogoutButton/>:<LoginButton/>
                    }
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