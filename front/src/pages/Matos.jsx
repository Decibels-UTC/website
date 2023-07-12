import MatosCard from "../components/Matos/MatosCard";
import { useEffect } from 'react';

function Matos ({setPageCallback}) {

  useEffect(() => {
    setPageCallback("matos")
  }, []);

  return (
    <div>
        <p>Page du Matos</p>
        <MatosCard/>
    </div>
  );
};

export default Matos;