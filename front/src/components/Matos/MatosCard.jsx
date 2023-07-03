import {useEffect, useState} from "react";


function MatosCard(){

    const [donnees, setDonnees] = useState(null);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
    const interrogerAPI = async () => {
      try {
        const reponse = await fetch('http://127.0.0.1:8000/api/items/');
        const donneesJSON = await reponse.json();
        setDonnees(donneesJSON);
      } catch (erreur) {
        setErreur(erreur);
      }
    };

    interrogerAPI();
    console.log(donnees)
        console.log(donnees["name"])
  }, []);


    return (
    <div>
      {donnees && (
        <div>
          <h1>Résultats de l'API :</h1>
            <p>{donnees["name"]}</p>
        </div>
      )}
      {erreur && <p>Une erreur s'est produite : {erreur.message}</p>}
    </div>
  );
}

export default MatosCard;