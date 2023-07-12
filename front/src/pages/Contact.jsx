
import CarteDeVisiteContact from "../components/Contact/ContactCard";
import Forms from "../components/Contact/Forms"
import Separation from "../components/Contact/Separation";
import ContactCard from "../components/Contact/ContactCard";
import { useEffect } from 'react';
function Contact({setPageCallback}) {

  useEffect(() => {
    setPageCallback("contact")
  }, []);

  return (
    <div>

        <div className="background">
        {<ContactCard/>}
        </div>
        <Separation/>
        <Forms/>
        <br/>
        <br/>
        <br/>
    </div>
  );
}

export default Contact;