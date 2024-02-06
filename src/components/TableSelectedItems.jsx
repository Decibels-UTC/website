import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';



function TableSelectedItems(props){
  const [itemCountByType, setItemCountByType] = useState({});
  const [totalPower, setTotalPower] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  let items = props.tab;

 const countItemsByType = (items) => {
  const categories = ['light', 'son', 'structure', 'autre'];
  const counts = {};

  // Initialiser les comptages pour chaque catégorie
  categories.forEach((category) => {
    counts[category] =  0;
  });

  // Compter les items pour chaque catégorie
  items.forEach((item) => {
    if (categories.includes(item.type)) {
      counts[item.type] += item.quantity;
    } else {
      // Si le type n'est pas dans la liste des catégories, on peut soit ignorer, soit ajouter à une catégorie 'autre'
      counts['autre'] += item.quantity;
    }
  });

  return counts;
};
  const calculateTotalPower = (items) => {
    return items.reduce((sum, item) => sum + item.power*item.quantity,  0);
  };
  const calculateTotalPrice = (items) => {
    return items.reduce((sum, item) => sum + item.price*item.quantity,  0);
  };



  useEffect(() => {
    setItemCountByType(countItemsByType(items));
    setTotalPower(calculateTotalPower(items));
    setTotalPrice(calculateTotalPrice(items));
    setItemCountByType(countItemsByType(items));
  }, [items]);

  return(
       <div className={"selected-items"}>

          <Table color='red'>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Items sélectionnés</TableHeaderCell>
                <TableHeaderCell>Nombre de lights</TableHeaderCell>
                <TableHeaderCell>Nombre de son</TableHeaderCell>
                <TableHeaderCell>Nombre de structure</TableHeaderCell>
                <TableHeaderCell>Nombre autre</TableHeaderCell>
                <TableHeaderCell>Puissance totale</TableHeaderCell>
                <TableHeaderCell>Prix total</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>{itemCountByType.son+itemCountByType.structure+itemCountByType.light+itemCountByType.autre}</TableCell>
                <TableCell>{itemCountByType.light}</TableCell>
                <TableCell>{itemCountByType.son}</TableCell>
                <TableCell>{itemCountByType.structure}</TableCell>
                <TableCell>{itemCountByType.autre}</TableCell>
                <TableCell>{totalPower}</TableCell>
                <TableCell>{totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>

  );
}


export default TableSelectedItems