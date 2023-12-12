import Container from "./Container";
import item1 from "../ressources/item1.png";
import item3 from "../ressources/item3.png";

import '../style/Lights.css';

function Lights(){
    return(
        <>
            <h1 className={"title"} >Lumières</h1>
            <div className={"text-middle text-middle-light"} >
                <Container height={600} width={600} text={"coucou"}/>
            </div>

            <div>
                <img className={"item item1-light-first"} src={item1} />
            </div>
            <div>
                <img className={"item item1-light-second"} src={item1} />
            </div>

            <div>
                <img className={"item item3-light"} src={item3}/>
            </div>


        </>
    );
}

export default Lights;
