import "../style/Links.css";


function Links() {

    function handleClickInventory(){
        window.location.href = '/inventory';
    }
    function handleClickPortfolio(){
        window.location.href = '/portfolio';
    }

  return (
      <>
      <div className="links-wrapper">
        <div className="link" onClick={handleClickInventory}>
            <h2>Inventaire</h2>
        </div>

        <div className="link" onClick={handleClickPortfolio}>
            <h2>Historique des évennements</h2>
        </div>

      </div>
      </>
  );
}

export default Links;