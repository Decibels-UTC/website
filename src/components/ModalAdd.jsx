import React, { useState } from 'react';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react';
import FormAdd from './FormAdd';

function exampleReducer(state, action) {
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
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const [formData, setFormData] = useState({}); // Nouvel état pour stocker les valeurs du formulaire

  const handleSubmit = () => {
    // Faire quelque chose avec les données du formulaire (formData)
    //console.log('Formulaire soumis avec succès !', formData);
  };

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
            className={'form-edit'}
            onSubmit={(formValues) => setFormData(formValues)} // Passer la fonction de mise à jour de l'état local
          />
          </div>
        </ModalContent>
        <ModalActions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Fermer
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
}

export default ModalAdd;
