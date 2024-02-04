import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm";
import '../style/Login.css';


function Inventory(){
    return(<>

            <div className={"login-form"}>
                <div className={"login-form-component"}>
                    <LoginForm/>
                </div>


            </div>


            <Footer/>

        </>
    );
}
export default Inventory;