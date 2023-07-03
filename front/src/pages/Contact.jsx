import CardContact from "../components/Contact/ContactCard";
import {useState} from "react";

function Contact() {


    function Count(){
        const [count, setCount] = useState(0);


        return(
          <div>
            <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
              <button onClick={() => setCount(0)}>Reset</button>
          </div>
        );
    }


  return (
    <div>

        <p>Page de contact</p>

        <CardContact name="Rick Sanchez" meta="scientist" description="New article"/>
        {Count()}

    </div>
  );
}

export default Contact;