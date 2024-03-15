import React, {useCallback, useEffect, useRef, useState, useContext} from 'react';
import {UserContext} from "../context/UserContext";
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
    Dropdown, Checkbox, Modal, Form, Input, Icon
} from 'semantic-ui-react';
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import _ from 'lodash';
import ModalAdd from "./ModalAdd";
import Stats from "./Stats";
import ModalSuccess from "./ModalSuccess";
import ModalFailed from "./ModalFailed";
import TableSelectedItems from "./TableSelectedItems";

function TableData() {
  const {userId} = useContext(UserContext);
  const [state, setState] = useState({ isLoading: false, results: [], value: '' });
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPower, setTotalPower] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItemForQuantity, setSelectedItemForQuantity] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const token = localStorage.getItem('token');
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >  1024);
  const [selection, setSelection] = useState('Sélection');
  const [ref, setRef] = useState('Référence');
  const [power, setPower] = useState('Puissance');
  const [price, setPrice] = useState('Prix');
  const [qte, setQte] = useState('Quantité');
  const [action, setAction] = useState('Actions');
  const [supp, setSuppr] = useState('Date de suppression');



  useEffect(() => {
    if (isLargeScreen) {
      setSelection("Sélection");
      setRef("Référence");
      setPower("Puissance");
      setPrice("Prix");
      setQte("Quantité");
      setAction("Actions");
      setSuppr("Date de suppression");
    } else {
      setSelection(<Icon name="tasks" />);
      setRef(<Icon name="address card outline" />);
      setPower(<Icon name="power cord" />);
      setPrice(<Icon name="money" />);
      setQte(<Icon name="boxes" />);
      setAction(<Icon name="edit outline" />);
      setSuppr(<Icon name="delete calendar" />);
    }
  }, [isLargeScreen]); 




    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >  1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const openQuantityModal = (item) => {
      setSelectedItemForQuantity(item);
      setOpenModal(true);
    };
    const closeQuantityModal = () => {
      setOpenModal(false);
    };
    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    };

const handleSubmission = () => {
  // Reset all filters and showDeleted state
  setSelectedCategory(null);
  setSelectedState(null);
  setShowDeleted(false);
  setCheckedItems({});
  setSelectedItems([]);
  setState({ isLoading: false, results: [], value: '' });

  // Fetch fresh data from the API
  fetch(process.env.REACT_APP_API_URL, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  .then((resp) => resp.json())
  .then(function (data) {
    // Update the table data and filtered data
    setTableData(data);
    setFilteredData(data.filter(item => showDeleted ? item.removed !== null : item.removed === null));
  })
  .catch(function (error) {
    console.log(error);
  });
};

const applyFilters = (rawData) => {
  let filteredData = rawData;

  // Appliquer le filtre par catégorie
  if (selectedCategory) {
    filteredData = filteredData.filter(item => item.type === selectedCategory);
  }

  // Appliquer le filtre par état
  if (selectedState) {
    filteredData = filteredData.filter(item => item.state === selectedState);
  }

  // Appliquer le filtre par éléments supprimés
  if (!showDeleted) {
    filteredData = filteredData.filter(item => !item.removed);
  }

  // Appliquer le filtre de recherche
  if (state.value) {
    const re = new RegExp(_.escapeRegExp(state.value), 'i');
    filteredData = filteredData.filter(item => re.test(item.name) || re.test(item.brand));
  }

  return filteredData;
};

const handleSubmissionEdit = () => {
  fetch(process.env.REACT_APP_API_URL, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  .then((resp) => resp.json())
  .then(function (data) {
    setTableData(data);
    setFilteredData(applyFilters(data));
  })
  .catch(function (error) {
    console.log(error);
  });
};


  useEffect(() => {
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

    const handleQuantitySubmit = useCallback((event) => {
  event.preventDefault();
  if (!isNaN(quantity) && quantity >=  1) {
    const existingItemIndex = selectedItems.findIndex(item => item.id === selectedItemForQuantity.id);
    if (existingItemIndex >=  0) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[existingItemIndex].quantity = parseInt(quantity,  10);
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, { ...selectedItemForQuantity, quantity: parseInt(quantity,  10) }]);
    }
    closeQuantityModal();
  } else {
    console.error('La valeur de la quantité doit être un nombre entier supérieur ou égal à  1.');
  }
}, [selectedItemForQuantity, closeQuantityModal, quantity, selectedItems]);
    const handleCancelSelection = useCallback(() => {
    setSelectedItems(prevSelectedItems => prevSelectedItems.filter(item => item.id !== selectedItemForQuantity.id));
    setCheckedItems(prevCheckedItems => {
    const updatedCheckedItems = { ...prevCheckedItems };
    delete updatedCheckedItems[selectedItemForQuantity.id];
    return updatedCheckedItems;
  });
  closeQuantityModal();
}, [selectedItemForQuantity, closeQuantityModal]);

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
    {key : 5, text: 'Elec', value: 'elec'},
    {key : 6, text: 'Secu', value: 'secu'}
  ];
   const options2 = [
    { key: 1, text: 'Neuf', value: 'neuf' },
    { key: 2, text: 'Usé', value: 'use' },
    { key: 3, text: 'Réparable', value: 'reparable' },
    { key: 4, text: 'Cassé', value: 'casse' },
    { key: 5, text: 'Bien', value: 'bien' },
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
const findTextByValue = (options, value) => {
  const foundOption = options.find(option => option.value === value);
  return foundOption ? foundOption.text : ''; // Retourne le texte ou une chaîne vide si aucune correspondance n'est trouvée
};
const transformData = (data, options, options2) => {
  return data.map(item => ({
    ...item,
    type: findTextByValue(options, item.type),
    state: findTextByValue(options2, item.state)
  }));
};
const exportToExcel = () => {
      const jsonData = transformData(filteredData,options, options2);
      const ws = XLSX.utils.json_to_sheet(jsonData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');
      XLSX.writeFile(wb, 'export_dBs.xlsx');
    };
const exportToExcelSelected = () => {
      const jsonData = transformData(selectedItems,options, options2);
      const ws = XLSX.utils.json_to_sheet(jsonData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');
      XLSX.writeFile(wb, 'export_selection_dBs.xlsx');
};

useEffect(() => {
  dispatch({ type: 'UPDATE_DATA', data: filteredData });
}, [filteredData]);
const handleCheckboxChange = (itemId) => {
  setCheckedItems((prevCheckedItems) => {
    const isChecked = !prevCheckedItems[itemId];
    const updatedCheckedItems = {
      ...prevCheckedItems,
      [itemId]: isChecked,
    };
    const itemDetails = tableData.find(item => item.id === itemId);
    if (isChecked) {
      openQuantityModal(itemDetails);
    } else {
      setSelectedItems(prevSelectedItems => prevSelectedItems.filter(item => item.id !== itemId));
    }
    return updatedCheckedItems;
  });
};


const [sort_state, dispatch] = React.useReducer(sortColumns, {
    column: null,
    data: filteredData,
    direction: null,
  })
    useEffect(() => {
  dispatch({ type: 'UPDATE_DATA', data: filteredData });
}, [filteredData, dispatch]);



const handleDeselectButton = () => {
    setSelectedItemForQuantity(null);
    setSelectedItems([]);
    setQuantity(0);
    setCheckedItems({});
};

  const { column, data, direction } = sort_state
  return (
    <>
      

        <div className={"info-table-wrapper"}>

        {isLargeScreen &&
            <div className={"stats"}>
                <Stats qte={totalQuantity} items={totalItems} total_price={totalPrice} total_power={totalPower} />
            </div>
        }

            {selectedItems.length === 0 ? null  :<>
                <TableSelectedItems tab={selectedItems} />
                <div className={"export-button-selected"}>
                    <div className="export-button-selected-button">
                        <Button   content='Export de la sélection' onClick={exportToExcelSelected} />
                    </div>
                    <div className="export-button-selected-button">
                        <Button  content='Tout déselectionner' onClick={handleDeselectButton} />
                    </div>
                </div>

            </>

            }
        </div>


      <Modal size="small" open={openModal} onClose={closeQuantityModal}>
        <Modal.Header>Entrez la quantité</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleQuantitySubmit}>
                <Form.Field>
                <label>Quantité</label>
                <Input type="number" min="1" required value={quantity} onChange={handleQuantityChange} />
                </Form.Field>
            <Button color='green' type="submit">Valider</Button>
              <Button color='red' onClick={handleCancelSelection}>Annuler</Button>
          </Form>
        </Modal.Content>
      </Modal>

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
          {showDeleted || userId === 2 ? null:
          <div className={""}>
           <ModalAdd submission={handleSubmission} />
          </div>}
         </div>
            <Button content='Export' onClick={exportToExcel} />
         </div>



        <Table striped sortable fixed unstackable>
        <TableHeader>
          <TableRow>
            {showDeleted ? null : <TableHeaderCell>{selection}</TableHeaderCell> }

            <TableHeaderCell sorted={column === 'name' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}>{ref}</TableHeaderCell>
            {isLargeScreen &&
            <>
            <TableHeaderCell sorted={column === 'brand' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'brand' })}>Marque</TableHeaderCell>
            <TableHeaderCell>Catégorie</TableHeaderCell>
            <TableHeaderCell>Etat</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            </>}
            <TableHeaderCell sorted={column === 'power' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'power' })}>{power}</TableHeaderCell>
            <TableHeaderCell sorted={column === 'price' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}>{price}</TableHeaderCell>
            <TableHeaderCell sorted={column === 'quantity' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'quantity' })}>{qte}</TableHeaderCell>
            
            {isLargeScreen && <><TableHeaderCell>Modification</TableHeaderCell><TableHeaderCell sorted={column === 'creation' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'creation' })}>Date d'ajout</TableHeaderCell></>}
            {showDeleted ? <TableHeaderCell sorted={column === 'removed' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'removed' })} >{supp}</TableHeaderCell> :
                
                null
            }
            {!showDeleted && userId!==2 &&isLargeScreen ? <>
                    <TableHeaderCell  sorted={column === 'modification_date' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'modification_date' })}>Date de modification</TableHeaderCell>
                </> :
                null
            }
            {!showDeleted && userId!==2 ? <>
                    <TableHeaderCell>{action}</TableHeaderCell>
                </> :
                null
            }
            {!showDeleted && userId===2 &&isLargeScreen ? <>
                    <TableHeaderCell  sorted={column === 'modification_date' ? direction : null} onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'modification_date' })}>Date de modification</TableHeaderCell>
                    
                </> :
                null
            }
          </TableRow>
        </TableHeader>

        <TableBody>
          {sort_state.data.map((item, index) => (
            <TableRow key={index}>
                {showDeleted ? null : <TableCell><Checkbox
                                checked={!!checkedItems[item.id]}
                                onChange={() => handleCheckboxChange(item.id)} /></TableCell> }
              <TableCell>{item.name}</TableCell>
              {isLargeScreen && <>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{options.find(option => option.value === item.type).text}</TableCell>
              <TableCell>{options2.find(option => option.value === item.state).text}</TableCell></>}
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.power}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              {isLargeScreen && <>
              <TableCell>{item.modification_reason ? item.modification_reason : '/'}</TableCell>
              <TableCell>{convertDateFormat(item.creation)}</TableCell></>}
              {showDeleted ? <TableCell>{convertDateFormat(item.removed)}</TableCell> :
                  null
              }
              {!showDeleted && userId !==2 &&isLargeScreen ? 
              <>
              <TableCell>{convertDateFormat(item.modification_date)}</TableCell>
              </> : null  
              }
              {!showDeleted && userId !==2  ? 
              <>
              <TableCell>
                 <ModalEdit submission={handleSubmissionEdit} item_id={item.id} reason={item.modification_reason} state={item.state}  power={item.power} name={item.name} brand={item.brand} type={item.type} description={item.description} price={item.price} quantity={item.quantity} date={item.creation} />
                 <ModalDelete submission={handleSubmission} item_id={item.id} reason={item.modification_reason} state={item.state} power={item.power} name={item.name} brand={item.brand} type={item.type} description={item.description} price={item.price} quantity={item.quantity} date={item.creation} />
              </TableCell>
              </> : null  
              }
              {!showDeleted && userId ===2 &&isLargeScreen ? <>
              <TableCell>{convertDateFormat(item.modification_date)}</TableCell>
              </> : null  
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </>
  );
}

export default TableData;
