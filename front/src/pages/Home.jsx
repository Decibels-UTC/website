import '../styles/Home.css';
import MessageMainPage from "../components/HomePageComponents/AdvertissementMainPage";
import { useEffect } from 'react';
import {Container} from "semantic-ui-react";



function Home({setPageCallback}) {

  useEffect(() => {
    setPageCallback("home")
  }, []);

  return (<>    <div>

            <MessageMainPage/>





    </div></>
  );
}

export default Home;