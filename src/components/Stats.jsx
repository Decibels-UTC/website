import {React,useContext} from 'react';
import {
  StatisticValue,
  StatisticLabel,
  StatisticGroup,
  Statistic,
} from 'semantic-ui-react';
import {AuthContext} from "../context/AuthContext";

function Stats(props) {
  const {isAuthenticated} = useContext(AuthContext);


  return (
    <div>

        <Statistic>
          <StatisticValue>{props.items === null ? 0 : props.items}</StatisticValue>
          <StatisticLabel>Items trouvés</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{props.qte === null ? 0 : props.qte}</StatisticValue>
          <StatisticLabel>Quantité totale</StatisticLabel>
        </Statistic>
        {isAuthenticated?
        <>
          <Statistic>
          <StatisticValue>{props.total_price === null ? 0 : props.total_price}</StatisticValue>
          <StatisticLabel>Prix total</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{props.power === null ? 0 : props.total_power}</StatisticValue>
          <StatisticLabel>Puissance totale</StatisticLabel>
        </Statistic>
        </> 
        : null}


    </div>
  );
}

export default Stats;
