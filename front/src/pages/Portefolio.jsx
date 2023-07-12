import { useEffect } from 'react';

function Portefolio ({setPageCallback}) {

  useEffect(() => {
    setPageCallback("portefolio")
  }, []);

  return (
    <div>
        <p>Page de portefolio</p>
    </div>
  );
};

export default Portefolio;