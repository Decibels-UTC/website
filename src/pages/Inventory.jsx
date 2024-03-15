import Footer from "../components/Footer"
import Matos from "../components/Matos";

function Inventory(){
    return(<>
            <body id={"body-inv"}>
                <div className={"matos-content"}>
                    <Matos/>
                </div>
            </body>
            <Footer/>
        </>
    );
}
export default Inventory;