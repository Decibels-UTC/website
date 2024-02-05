import React from 'react'
import { CardContent, Card, Icon } from 'semantic-ui-react'


function CardRecap(props) {
    function convertDateFormat(isoDateString) {
      const dateObject = new Date(isoDateString);
      const readableDate = dateObject.toISOString().replace("T", " ").replace("Z", "");

      return readableDate;
  }

    return(
         <Card>
    <CardContent header={props.name +"  "+props.brand} />
    <CardContent description={"Quantité : "+ props.quantity +"\n" +"Prix : "+props.price} />
    <CardContent extra>
      <Icon name='tag' />{"Date d'ajout :" + convertDateFormat(props.date)}
    </CardContent>
  </Card>
    )
}


export default CardRecap;