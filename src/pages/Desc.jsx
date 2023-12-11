import item1 from "../ressources/item1.png"
import imgdBs from "../ressources/imgdbs.jpg"
import "../style/Desc.css";
import Container from "../components/Container";

function Desc() {
  return (
      <>
          <div>
              <h1>Décibels c'est : </h1>
          </div>
          <div>
              <img src={item1} className={"item1-first"} />
              <img src={item1} className={"item1-second"} />
              <img src={item1} className={"item1-third"} />
          </div>

          <div className={"zones de texte"}>
              <Container className={"first-text"} width={300} height={200} text={"Lorem ipusm"}/>
              <Container className={"second-text"} width={300} height={200} text={"Lorem ipusm"}/>
              <Container className={"third-text"} width={300} height={200} text={"Lorem ipusm"}/>
          </div>


          <div className={"place-holder-img"}>
              <Container className={"img-placeholder"} width={500} height={400} src={imgdBs}/>
          </div>


      </>
  );
}

export default Desc;