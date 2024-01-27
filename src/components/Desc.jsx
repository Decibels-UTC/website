import item1 from "../ressources/item1.png"
import imgdBs from "../ressources/imgdbs.jpg"
import onde3 from "../ressources/animations/onde3.gif"
import onde5 from "../ressources/animations/onde5.gif"
import "../style/Desc.css";
import Container from "./Container";
import { motion } from "framer-motion"


function Desc() {
  return (
      <>
          <div className="page-desc">
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

              <div className={"first-text "}>
                  <Container className={"first-container-desc"} width={300} height={200}text={"Décibels c'est 12 évènnements en A23\n" + "" + ""}/>
              </div>
                  <motion.img className={"onde3-desc1"} src={onde3}></motion.img>

              <div className={"second-text "}>
                  <Container className={"second-container-desc"} width={300} height={200} text={"Une équipe de XX personnes " + "\n" +""}/>
              </div>
                  <motion.img className={"onde3-desc2"} src={onde3}></motion.img>

              <div className={"third-text "}>
                  <Container className={"third-container-desc"} width={300} height={200} text={"Lorem ipusm"}/>
              </div>
                  <motion.img className={"onde3-desc3"} src={onde3}></motion.img>

          </div>
          <div className={"place-holder-img"}>


              <figure>
                  <motion.img src={imgdBs} className={"img-placeholder"}
                              initial={{x: 0, opacity: 0.8, scale: 1, rotate: 0}}
                              whileInView={{x: 0, opacity: 1, scale: 1, rotate: 0}}
                              viewport={{once: true}}
                              transition={{duration: 2}}
                  ></motion.img>
                  <figcaption>Crédits photo : PAE UTC - Picsart</figcaption>
              </figure>

          </div>

          <motion.img className={"onde5-desc"} src={onde5}>
          </motion.img>
      </>
  );
}

export default Desc;