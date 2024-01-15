import item1 from "../ressources/item1.png"
import imgdBs from "../ressources/imgdbs.jpg"
import "../style/Desc.css";
import Container from "./Container";
import { motion } from "framer-motion"


function Desc() {
  return (
      <>
          <div className="page-desc" >
              <h1 className={"title desc-title"}>Décibels c'est : </h1>
          </div>
          <div className={"container-items"}>

              <motion.img src={item1} className={"item1-first items"}
                          initial={{x: -150, opacity: 0.8, scale: 1, rotate: -90}}
                          whileInView={{x: 0, opacity: 1, scale: 1, rotate: -90}}
                          viewport={{once: true}}
                          transition={{duration: 2}}
              ></motion.img>
              <motion.img src={item1} className={"item1-second items"}
                          initial={{x: -150, opacity: 0.8, scale: 1, rotate: -90}}
                          whileInView={{x: 0, opacity: 1, scale: 1, rotate: -90}}
                          viewport={{once: true}}
                          transition={{duration: 2}}
              ></motion.img>
              <motion.img src={item1} className={"item1-third items"}
                          initial={{x: -150, opacity: 0.8, scale: 1, rotate: -90}}
                          whileInView={{x: 0, opacity: 1, scale: 1, rotate: -90}}
                          viewport={{once: true}}
                          transition={{duration: 2}}
              ></motion.img>


          </div>

          <div className={"zone-texte"}>

              <div className={"first-text "}><Container className={"container"} width={300} height={200} text={"Lorem ipusm"}/></div>
              <div className={"second-text "}><Container className={"container"} width={300} height={200} text={"Lorem ipusm"}/></div>
              <div className={"third-text "}><Container className={"container"}  width={300} height={200} text={"Lorem ipusm"}/></div>

          </div>
          <div className={"place-holder-img"}>
              <motion.img src={imgdBs} className={"img-placeholder"}
                          initial={{x: 0, opacity: 0.8, scale: 1, rotate: 0}}
                          whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                          viewport={{once: true}}
                          transition={{duration: 2}}
              ></motion.img>
          </div>


      </>
  );
}

export default Desc;