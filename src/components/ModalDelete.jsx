import React, { useState } from 'react';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react';
import CardRecap from "./CardRecap";

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

function ModalDelete(props) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const handleApiCall = () => {

    const dataToUpdate = {
      modification_reason : "item deleted",
      removed : true
    };
    console.log(dataToUpdate);
      const token = localStorage.getItem('token');
      const apiUrl = 'http://localhost:8000/api/items/'+props.item_id+'/';
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(dataToUpdate),
      };

      fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(updatedData => {
          console.log("Données mises à jour :", updatedData);
          window.location.reload();
        })
        .catch(error => {
          console.error("Erreur lors de la mise à jour :", error);
        });
  };

  return (
    <>
      <Button icon='delete' onClick={() => dispatch({ type: 'open', size: 'small' })}></Button>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <ModalHeader>Suppression d'un item</ModalHeader>
        <ModalContent>
          <div className={"modal-wrapper"} >
            <p>Êtes-vous sûr de vouloir supprimer cet item ? Cette action est irréversible</p><br/>
            <CardRecap name={props.name} brand={props.brand} quantity={props.quantity} price={props.price} date={props.date} />
          </div>
        </ModalContent>
        <ModalActions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Non
          </Button>
          <Button positive onClick={() => {
            handleApiCall();
            dispatch({ type: 'close' });
          }}>
            Oui
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
}

export default ModalDelete;
