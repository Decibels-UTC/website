import item1 from "../ressources/item1.png"
import imgdBs from "../ressources/imgdbs.jpg"
import "../style/Desc.css";
import Container from "./Container";

function Desc() {
  return (
      <>
          <div className="page-desc" >
              <h1 className={"title desc-title"}>Décibels c'est : </h1>
          </div>
          <div className={"container-items"}>
              <img src={item1} className={"item1-first items"} />
              <img src={item1} className={"item1-second items"} />
              <img src={item1} className={"item1-third items"} />
          </div>

          <div className={"zone-texte"}>
              <Container className={"first-text container"} width={300} height={200} text={"Lorem ipusm"}/>
              <Container className={"second-text container"} width={300} height={200} text={"Lorem ipusm"}/>
              <Container className={"third-text container"} width={300} height={200} text={"Lorem ipusm"}/>

            <div className={"place-holder-img"}>
              <Container  className={"img-placeholder"} width={700} height={"auto"} src={imgdBs}/>
            </div>

          </div>



      </>
  );
}

export default Desc;