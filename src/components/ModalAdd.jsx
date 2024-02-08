import React, { useState } from 'react';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react';
import FormAdd from './FormAdd';

function Reducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size };
    default:
      throw new Error('Unsupported action...');
  }
}

function ModalAdd(props) {
  const [state, dispatch] = React.useReducer(Reducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const [formData, setFormData] = useState({});


  return (
    <>
      <Button
        icon='add'
        onClick={() => dispatch({ type: 'open', size: 'small' })}
      >
        Ajouter un nouvel item à l'inventaire
      </Button>

      <Modal size={size} open={open} onClose={() => dispatch({ type: 'close' })}>
        <ModalHeader>Ajout d'un item</ModalHeader>
        <ModalContent>
          <div className={'modal-wrapper'}>
            <p>Ajout d'un élément à l'inventaire</p>
            <br />

            <FormAdd
            submission={props.submission}
            className={'form-edit'}
            onSubmit={(formValues) => setFormData(formValues)} 
            closeModal={() => dispatch({ type: 'close' })} 
          />
          </div>
        </ModalContent>

      </Modal>
    </>
  );
}

export default ModalAdd;
