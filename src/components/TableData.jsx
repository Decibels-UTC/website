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
    Dropdown, Checkbox
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [filteredDataCombined, setFilteredDataCombined] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(process.env.REACT_APP_API_URL, {
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
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() +  1).padStart(2, '0');
    const year = dateObject.getFullYear();
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;
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

   const [totalItems, setTotalItems] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [totalPower, setTotalPower] = useState(0);

    useEffect(() => {
      // Calcul des totaux
      const items = filteredData.length;
      const price = filteredData.reduce((acc, item) => acc + item.price*item.quantity, 0);
      const quantity = filteredData.reduce((acc, item) => acc + item.quantity, 0);
      const power  = filteredData.reduce((acc, item) => acc + item.power*item.quantity, 0);

      setTotalItems(items);
      setTotalPrice(price);
      setTotalQuantity(quantity);
      setTotalPower(power)
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
function sortColumns(sort_state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (sort_state.column === action.column) {
        // Si on clique sur la même colonne, on inverse l'ordre de tri
        const sortedData = _.orderBy(sort_state.data, [action.column], [sort_state.direction === 'ascending' ? 'desc' : 'asc']);
        return {
          ...sort_state,
          data: sortedData,
          direction: sort_state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      } else {
        // Sinon, on trie par la nouvelle colonne en ordre croissant
        const sortedData = _.orderBy(sort_state.data, [action.column], ['asc']);
        return {
          column: action.column,
          data: sortedData,
          direction: 'ascending',
        };
      }
    case 'UPDATE_DATA':
      // Mettre à jour les données sans changer l'ordre de tri
      return {
        ...sort_state,
        data: action.data,
      };
    default:
      throw new Error('Unknown action type');
  }
}


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

useEffect(() => {
  dispatch({ type: 'UPDATE_DATA', data: filteredData });
}, [filteredData]);


const [sort_state, dispatch] = React.useReducer(sortColumns, {
    column: null,
    data: filteredData,
    direction: null,
  })
  const { column, data, direction } = sort_state
  return (
    <>
        <div className={"stats"}>
            <Stats qte={totalQuantity} items={totalItems} total_price={totalPrice} total={totalPower}  />
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
                placeholder="Catégorie"
                options={options}
                onChange={handleCategoryChange}
                value={selectedCategory}
                selection
                />
            <Button icon={"delete"} onClick={() => handleResetFilter()} />
              </div>
              <div className={"dropdown-filters"}>
              <Dropdown
                placeholder="Etat"
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



            <Table striped sortable fixed>
        <TableHeader>
          <TableRow>
            {showDeleted ? null : <TableHeaderCell>Sélection</TableHeaderCell> }
            <TableHeaderCell sorted={column === 'name' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}>Référence</TableHeaderCell>
            <TableHeaderCell sorted={column === 'brand' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'brand' })}>Marque</TableHeaderCell>
            <TableHeaderCell>Catégorie</TableHeaderCell>
            <TableHeaderCell>Etat</TableHeaderCell>
            <TableHeaderCell sorted={column === 'power' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'power' })}>Puissance</TableHeaderCell>
            <TableHeaderCell sorted={column === 'price' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}>Prix</TableHeaderCell>
            <TableHeaderCell sorted={column === 'quantity' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'quantity' })}>Quantité</TableHeaderCell>
            <TableHeaderCell>Modification</TableHeaderCell>
            <TableHeaderCell sorted={column === 'creation' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'creation' })}>Date d'ajout</TableHeaderCell>
            {showDeleted ? <TableHeaderCell sorted={column === 'removed' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'removed' })} >Date de suppression</TableHeaderCell> :
                <>
                    <TableHeaderCell  sorted={column === 'modification_date' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'modification_date' })}>Date de modification</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                </>
            }
          </TableRow>
        </TableHeader>

        <TableBody>
          {sort_state.data.map((item, index) => (
            <TableRow key={index}>
                {showDeleted ? null : <TableCell><Checkbox/></TableCell> }
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.state}</TableCell>
              <TableCell>{item.power}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.modification_reason ? item.modification_reason : '/'}</TableCell>
              <TableCell>{convertDateFormat(item.creation)}</TableCell>
              {showDeleted ? <TableCell>{convertDateFormat(item.removed)}</TableCell> :
                  <>
              <TableCell>{convertDateFormat(item.modification_date)}</TableCell>
              <TableCell>
                 <ModalEdit item_id={item.id} reason={item.modification_reason} state={item.state}  power={item.power} name={item.name} brand={item.brand} type={item.type} price={item.price} quantity={item.quantity} date={item.creation} />
                 <ModalDelete item_id={item.id} reason={item.modification_reason} state={item.state} power={item.power} name={item.name} brand={item.brand} type={item.type} price={item.price} quantity={item.quantity} date={item.creation} />
              </TableCell>
              </>
              }
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
