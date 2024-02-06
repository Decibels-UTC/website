import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm";
import '../style/Login.css';


function Inventory(){
    return(<>

            <div className={"login-form"}>
                <div className="login-title">
                    <h1>Gestion de l'inventaire Décibels</h1>
                </div>
                <div className={"login-form-component"}>
                        <LoginForm/>
                </div>
            </div>


            <Footer/>

        </>
    );
}
export default Inventory;