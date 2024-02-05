import React from 'react'
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react'

function Reducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

const ModalSuccess = ({ onClose }) => {
  const [state, dispatch] = React.useReducer(Reducer, {
    open: false,
    size: undefined,
  });

  const { open, size } = state;

  React.useEffect(() => {
    if (open) {
      // Déclenchez ici les actions nécessaires lors de l'ouverture du modal
    }
  }, [open]);

  return (
    <>
        <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <ModalHeader>Ajout d'un item</ModalHeader>
        <ModalContent>
          <Icon disabled name="coffee" size='massive'/>
          <p>Ajout réalisé avec succès !</p>
        </ModalContent>
        <ModalActions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Ok!
          </Button>

        </ModalActions>
      </Modal>
    </>
  )
}

export default ModalSuccess;
