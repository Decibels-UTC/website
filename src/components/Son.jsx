import Container from "./Container";
import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";

import '../style/Son.css'


function Son(){
    return(
        <div className="page">
            <h1>Son</h1>
            <div>
                <Container  height={400} width={500} text={"coucou"}/>
            </div>
            <div>
                <img src={item2} className={"item son"}  />
            </div>
            <div>
                <img src={item1}  className={"item item1"}/>
            </div>

        </div>
    );
}

export default Son;
