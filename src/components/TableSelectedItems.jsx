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
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >  1024);

  useEffect(() => {
      const handleResize = () => {
          setIsLargeScreen(window.innerWidth >  1024);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);


  let items = props.tab;

 const countItemsByType = (items) => {
  const categories = ['light', 'son', 'structure', 'autre'];
  const counts = {};

  categories.forEach((category) => {
    counts[category] =  0;
  });

  items.forEach((item) => {
    if (categories.includes(item.type)) {
      counts[item.type] += item.quantity;
    } else {
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
                {isLargeScreen &&
                <>
                <TableHeaderCell>Nombre de lights</TableHeaderCell>
                <TableHeaderCell>Nombre de son</TableHeaderCell>
                <TableHeaderCell>Nombre de structure</TableHeaderCell>
                <TableHeaderCell>Nombre autre</TableHeaderCell></>}

                <TableHeaderCell>Puissance totale</TableHeaderCell>
                <TableHeaderCell>Prix total</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>{itemCountByType.son+itemCountByType.structure+itemCountByType.light+itemCountByType.autre}</TableCell>
                {isLargeScreen &&
                <>
                <TableCell>{itemCountByType.light}</TableCell>
                <TableCell>{itemCountByType.son}</TableCell>
                <TableCell>{itemCountByType.structure}</TableCell>
                <TableCell>{itemCountByType.autre}</TableCell></>}
                <TableCell>{totalPower}</TableCell>
                <TableCell>{totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>

  );
}


export default TableSelectedItems