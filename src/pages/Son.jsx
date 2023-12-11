import Container from "../components/Container";
import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";

function Son(){
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
                <img src={item2}/>
            </div>


        </>
    );
}

export default Son;
