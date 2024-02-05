import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Search,
  Table,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Button,
  Dropdown
} from 'semantic-ui-react';
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import _ from 'lodash';
import ModalAdd from "./ModalAdd";
import Stats from "./Stats";
import ModalSuccess from "./ModalSuccess";
import ModalFailed from "./ModalFailed";

function TableData() {
  const [state, setState] = useState({ isLoading: false, results: [], value: '' });
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [filteredDataCombined, setFilteredDataCombined] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api', {
         headers: {
            'Authorization': `Token ${token}`
         }
        })
      .then((resp) => resp.json())
      .then(function (data) {
        setTableData(data);
        setFilteredData(data.filter(item => showDeleted ? item.removed !== null : item.removed === null));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [showDeleted]);

  function convertDateFormat(isoDateString) {
      const dateObject = new Date(isoDateString);
      const readableDate = dateObject.toISOString().replace("T", " ").replace("Z", "");

      return readableDate;
  }
  const handleSearchChange = (e, { value }) => {
  setState({ isLoading: true, value });

  setTimeout(() => {
    if (value.length < 1) {
      const filteredData = tableData.filter(item =>
        (selectedCategory === null || item.type === selectedCategory) &&
        (selectedState === null || item.state === selectedState) &&
        (showDeleted ? item.removed !== null : item.removed === null)
      );

      setFilteredData(filteredData);
      return setState({ isLoading: false, results: [], value });
    }

    const re = new RegExp(_.escapeRegExp(value), 'i');

    const filteredData = tableData.filter((item) => {
      return (
        (selectedCategory === null || item.type === selectedCategory) &&
        (selectedState === null || item.state === selectedState) &&
        (showDeleted ?
          (item.removed !== null && (re.test(item.name) || re.test(item.brand))) :
          (item.removed === null && (re.test(item.name) || re.test(item.brand)))
        )
      );
    });

    setFilteredData(filteredData);
    setState({
      isLoading: false,
      results: filteredData.map((item) => ({ title: item.name })),
      value,
    });
  }, 0);
};
  const handleResultSelect = (e, { result }) => setState({ value: result.title });
   const sortByColumn = (columnName) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (columnName === 'price' || columnName === 'creation') {
        return a[columnName] - b[columnName];
      }
    });

    setFilteredData(sortedData);
    setSortedColumn(columnName);
  };
   const [totalItems, setTotalItems] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantity, setTotalQuantity] = useState(0);
    useEffect(() => {
      // Calcul des totaux
      const items = filteredData.length;
      const price = filteredData.reduce((acc, item) => acc + item.price, 0);
      const quantity = filteredData.reduce((acc, item) => acc + item.quantity, 0);

      setTotalItems(items);
      setTotalPrice(price);
      setTotalQuantity(quantity);
    }, [filteredData]);
    const options = [
    { key: 1, text: 'Light', value: 'light' },
    { key: 2, text: 'Son', value: 'son' },
    { key: 3, text: 'Structure', value: 'structure' },
    { key: 4, text: 'Autre', value: 'autre' },
  ];
   const options2 = [
    { key: 1, text: 'Neuf', value: 'neuf' },
    { key: 2, text: 'Usé', value: 'use' },
    { key: 3, text: 'Réparable', value: 'reparable' },
    { key: 4, text: 'Cassé', value: 'casse' },
  ];

const handleCategoryChange = (e, { value }) => {
      if(value !== null){
          const tempShowDeleted = showDeleted;
      if(selectedCategory === null){
          setTableDataTemp1(filteredData)
      }
      setSelectedCategory(value);

      const filteredByCategory = tableData.filter(item => {
        if (tempShowDeleted) {
          return item.removed !== null && item.type === value && (!selectedState || item.state === selectedState);
        } else {
          return item.removed === null && item.type === value && (!selectedState || item.state === selectedState);
        }
      }
      );
      setShowDeleted(tempShowDeleted);
      setFilteredData(filteredByCategory);
      setFilteredDataCombined(filteredByCategory);
      }

    };
const handleStateChange = (e, { value }) => {
        if(value !== null) {

            const tempShowDeleted = showDeleted;

            if (selectedState === null) {
                setTableDataTemp2(filteredData)
            }
            setSelectedState(value);
            const filteredByState = tableData.filter(item => {
                if (tempShowDeleted) {
                    return item.removed !== null && item.state === value && (!selectedCategory || item.type === selectedCategory);
                } else {
                    return item.removed === null && item.state === value && (!selectedCategory || item.type === selectedCategory);
                }
            });

            setShowDeleted(tempShowDeleted);
            setFilteredData(filteredByState);
            setFilteredDataCombined(filteredByState);
        }

    };


const [tableDataTemp1, setTableDataTemp1] = useState(null);
const [tableDataTemp2, setTableDataTemp2] = useState(null);
const handleResetFilterState = () => {
  if (selectedState !== null) {
    setSelectedState(null);
    if(selectedCategory === null){
        setFilteredData(tableData);
          const filteredByCategory = tableData.filter(item => {
            if (showDeleted) {
              return item.removed !== null;
            } else {
              return item.removed === null;
            }
          }
          );
          setFilteredData(filteredByCategory);
    }else{
            setFilteredData(tableData);
          const filteredByCategory = tableData.filter(item => {
            if (showDeleted) {
              return item.removed !== null && item.type === selectedCategory;
            } else {
              return item.removed === null && item.type === selectedCategory;
            }
          }
          );
          setFilteredData(filteredByCategory);
    }
  }
  // si déjà à null ne rien faire
};
const handleResetFilter = () => {

  if (selectedCategory !== null) {
    setSelectedCategory(null);
    if(selectedState === null){
        setFilteredData(tableData);
          const filteredByCategory = tableData.filter(item => {
            if (showDeleted) {
              return item.removed !== null;
            } else {
              return item.removed === null;
            }
          }
          );
          setFilteredData(filteredByCategory);
    }else{
        console.log("coucou")
        console.log(tableData)
        setFilteredData(tableData);
        const filteredByState = tableData.filter(item => {
            if (showDeleted) {
                return item.removed !== null && item.state === selectedState;
            } else {
                return item.removed === null && item.state === selectedState;
            }
        });
        setFilteredData(filteredByState);
    }
  }
  // si déjà à null ne rien faire
};
const exportToExcel = () => {
      const jsonData = filteredData;
      const ws = XLSX.utils.json_to_sheet(jsonData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');
      XLSX.writeFile(wb, 'export_dBs.xlsx');
    };


  return (
    <>
        <div className={"stats"}>
            <Stats qte={totalQuantity} items={totalItems} total_price={totalPrice}  />
        </div>
      <div className={"wrapper-export"}>
          <div className={"wrapper-options-tabledata"} >
              <Search
          className={"search"}
          aligned='right'
          loading={state.isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 0, { leading: true })}
          value={state.value}
          showNoResults={false}
        />
        <Button content='Inventaire actuel' onClick={() => setShowDeleted(false) && setSelectedCategory(null) && setSelectedState(null) && setTableDataTemp1([])&& setTableDataTemp2([])} />
        <Button content='Items supprimés' onClick={() => setShowDeleted(true) && setSelectedCategory(null) && setSelectedState(null) && setTableDataTemp1([])&& setTableDataTemp2([])} />
         <div className={"dropdown-filters"}>
              <Dropdown
                options={options}
                onChange={handleCategoryChange}
                value={selectedCategory}
                selection
                />
            <Button icon={"delete"} onClick={() => handleResetFilter()} />
              </div>
              <div className={"dropdown-filters"}>
              <Dropdown
                options={options2}
                onChange={handleStateChange}
                value={selectedState}
                selection
                />
            <Button icon={"delete"} onClick={() => handleResetFilterState()} />
              </div>
         </div>

            <Button content='Export' onClick={exportToExcel} />
         </div>



            <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell onClick={() => sortByColumn('name')}>Référence</TableHeaderCell>
            <TableHeaderCell onClick={() => sortByColumn('brand')}>Marque</TableHeaderCell>
            {!showDeleted && <TableHeaderCell onClick={() => sortByColumn('category')}>Catégorie</TableHeaderCell>}
            <TableHeaderCell onClick={() => sortByColumn('state')}>Etat</TableHeaderCell>
            <TableHeaderCell onClick={() => sortByColumn('power')}>Puissance</TableHeaderCell>
            <TableHeaderCell onClick={() => sortByColumn('price')}>Prix</TableHeaderCell>
            <TableHeaderCell onClick={() => sortByColumn('quantity')}>Quantité</TableHeaderCell>
            <TableHeaderCell onClick={() => sortByColumn('modification_reason')}>Modification</TableHeaderCell>
            <TableHeaderCell onClick={() => sortByColumn('modification_date')}>Date de modification</TableHeaderCell>
            <TableHeaderCell onClick={() => sortByColumn('creation')}>Date d'ajout</TableHeaderCell>
            {showDeleted ? null : <TableHeaderCell>Actions</TableHeaderCell>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.state}</TableCell>
              <TableCell>{item.power}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.modification_reason ? item.modification_reason : '/'}</TableCell>
              <TableCell>{convertDateFormat(item.modification_date)}</TableCell>
              <TableCell>{convertDateFormat(item.creation)}</TableCell>
              {showDeleted ? null :
              <TableCell>
                 <ModalEdit item_id={item.id} reason={item.modification_reason} state={item.state}  power={item.power} name={item.name} brand={item.brand} type={item.type} price={item.price} quantity={item.quantity} date={item.creation} />
                 <ModalDelete item_id={item.id} reason={item.modification_reason} state={item.state} power={item.power} name={item.name} brand={item.brand} type={item.type} price={item.price} quantity={item.quantity} date={item.creation} />
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showDeleted ? null :
      <div className={"modal-add-wrapper"}>
       <ModalAdd />
      </div>}
    </>
  );
}

export default TableData;
