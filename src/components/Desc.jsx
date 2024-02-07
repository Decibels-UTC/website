import item1 from "../ressources/item1.png"
import imgdBs from "../ressources/imgdbs.jpg"
import onde3 from "../ressources/animations/onde3.gif"
import onde5 from "../ressources/animations/onde5.gif"
import "../style/Desc.css";
import { motion } from "framer-motion"


function Desc() {
  return (
      <>
            <div className="page-desc">
                <h1 className={"title desc-title"}>Décibels c'est : </h1>
            </div>
            <div className={"grid-desc"}>

                <div className={"items1"}>
                    <motion.img src={item1} className={"item1-first items"}
                              initial={{x: -100, opacity: 0.8, scale: 1, rotate: -90}}
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

                
                <div className={"first-text "}>
                    <motion.div className={"container first-container-desc"}
                            whileHover={{scale: 1.1}}
                    >
                        <h2>Tout au long de l'année...</h2>
                        <hr></hr>
                        <h5>Décibels c'est 12 évènements en A23</h5>
                    </motion.div>
                </div>

                <motion.img className={"onde3-desc1"} src={onde3}></motion.img>

                
                <div className={"second-text "}>
                    <motion.div className={"container second-container-desc"}
                            whileHover={{scale: 1.1}}
                    >
                        <h2>Une grande famille</h2>
                        <hr></hr>
                        <h5>Une équipe de plus de 20 personnes ! </h5>
                    </motion.div>
                </div>
                
                <motion.img className={"onde3-desc2"} src={onde3}></motion.img>
                

                <div className={"third-text "}>
                    <motion.div className={"container third-container-desc"}
                              whileHover={{scale: 1.1}}
                    >
                         <h2>Matériel</h2>
                        <hr></hr>
                        <h5>Décibels a amassé au fur et à mesure de son avancement 100 000 euros de matériel son & lumières !</h5>
                    </motion.div>
                </div>
                  <motion.img className={"onde3-desc3"} src={onde3}></motion.img>

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

            </div>
            <div className={"onde5-desc-container"}>
                <motion.img className={"onde5-desc"} src={onde5}>
                </motion.img>
            </div>

      </>
  );
}

export default Desc;
