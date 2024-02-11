import React, { useEffect, useReducer, useState } from "react";
import _ from 'lodash';
import "../style/History.css";
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Button,
  Search,
} from "semantic-ui-react";
import * as XLSX from "xlsx";

function HistoryTable() {
  const [tableHistory, setTableHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(process.env.REACT_APP_API_URL + "history/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then(function (data) {
        if (Array.isArray(data)) {
          setTableHistory(data);
          dispatch({ type: 'SET_DATA', payload: data });
        } else {
          console.error("Data received from API is not an array:", data);
        }
      })
      .catch(function (error) {
        console.error("Error fetching history:", error);
      });
  }, []);

  function convertDateFormat(isoDateString) {
    const dateObject = new Date(isoDateString);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() +   1).padStart(2, "0");
    const year = dateObject.getFullYear();
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;
  }

  const exportToExcel = () => {
    const jsonData = tableHistory;
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');
    XLSX.writeFile(wb, 'export_historique_tennis.xlsx');
  };

  const initialState = {
    column: null,
    data: [],
    direction: null,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  function Reducer(state, action) {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          };
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        };
      default:
        throw new Error();
    }
  }

  const { column, data, direction } = state;

  const handleSearch = (event, { value }) => {
    const searchValue = value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredData = tableHistory.filter((item) => {
      return item.user.toLowerCase().includes(searchValue) || item.action.toLowerCase().includes(searchValue);
    });

    dispatch({ type: 'SET_DATA', payload: filteredData });
  };

  return (
    <>
      <div className={"header-bar-wrapper"}>
        <Search
          className={"search"}
          aligned='right'
          value={searchTerm}
          onSearchChange={handleSearch}
          showNoResults={false}
        />
        <Button content='Export' onClick={exportToExcel} />
      </div>

      <Table sortable striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              sorted={column === 'action' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'action' })}
            >Action</TableHeaderCell>
            <TableHeaderCell
              sorted={column === 'user' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'user' })}
            >Utilisateur</TableHeaderCell>
            <TableHeaderCell
              sorted={column === 'date' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'date' })}
            >Date</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.action}</TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>{convertDateFormat(item.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default HistoryTable;