import React from 'react'
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react'
import CardRecap from "./CardRecap";
import FormEdit from "./FormEdit";

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

function  ModalEdit(props){

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  return (
    <>
        <Button icon='edit' onClick={() => dispatch({ type: 'open', size: 'small' })}></Button>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <ModalHeader>Modification d'un item</ModalHeader>
        <ModalContent>
          <div className={"modal-wrapper"} >
            <p>Modification de l'item</p><br/>
          <FormEdit className={"form-edit"} state={props.state} power={props.power} item_id={props.item_id} name={props.name} brand={props.brand} type={props.type} quantity={props.quantity} price = {props.price} date={props.date} />
          </div>

        </ModalContent>
        <ModalActions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Fermer
          </Button>
        </ModalActions>
      </Modal>
    </>
  )
}

export default ModalEdit;