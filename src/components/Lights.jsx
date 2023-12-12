import Container from "./Container";
import item1 from "../ressources/item1.png";
import item3 from "../ressources/item3.png";

function Lights(){
    return(
        <>
            <h1>Son</h1>
            <div>
                <Container  height={300} width={300} text={"coucou"}/>
            </div>
            <div>
                <img src={item1} />
            </div>
            <div>
                <img src={item3}/>
            </div>


        </>
    );
}

export default Lights;
