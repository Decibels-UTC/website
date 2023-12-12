import Container from "./Container";
import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";

import '../style/Son.css'


function Son(){
    return(
        <div className="page-son">
            <h1 className={"title"}>Son</h1>
            <div className={"text-middle"}>
                <Container height={600} width={600} text={"coucou"}/>
            </div>
            <div>
                <img src={item2} className={"item son"}  />
            </div>
            <div>
                <img src={item1}  className={"item item1-son"}/>
            </div>

        </div>
    );
}

export default Son;
