import { motion } from "framer-motion"


function Container(props) {
    return(
        <>
            <motion.div className={"container"} style={{width:props.width, height:props.height}}


            >
                {!!props.title && <h1 className={"title-container"}>{props.title}</h1>}
                {!!props.text && <p>{props.text}</p>}
                {!!props.src && <img src={props.src} className={"img"}/>}


            </motion.div>

        </>
    );

}
export default Container;