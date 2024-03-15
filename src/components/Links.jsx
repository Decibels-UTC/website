import "../style/Links.css";
import { motion } from "framer-motion"


function Links() {

    function handleClickInventory(){
        window.location.href = '/inventory';
    }
    function handleClickPortfolio(){
        window.location.href = '/portfolio';
    }

  return (
      <>
      <div className="links-wrapper">
        <motion.div className="link" onClick={handleClickInventory} whileHover={{scale: 1.1}}>
            <h2>Inventaire</h2>
        </motion.div>
        {/*
        <div className="link" onClick={handleClickPortfolio}>
            <h2>Historique des évennements</h2>
        </div>
        */}
        

      </div>
      </>
  );
}

export default Links;