import error from "../ressources/error404.png";
import "../style/error404.css";

function Error404(){
    return(<>
            <div className={"div-error404"}>
                <a href={"/"}><img src={error} className={"img-error404"} /></a>
            </div>
            <div className={"fix-footer"}></div>
    </>

    );
}

export default Error404;