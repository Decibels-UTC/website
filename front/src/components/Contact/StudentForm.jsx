import {
  Container,
  Divider,
  Header,
  Card,
  Icon,
  Grid,
  Form,
  Checkbox,
  Button
} from 'semantic-ui-react';

function StudentForm() {
  return (
    <>
      <Form>
        <Form.Field required>
          <label>Prénom</label>
          <input placeholder='Prénom' />
        </Form.Field>
        <Form.Field required>
          <label>Nom</label>
          <input placeholder='Nom' />
        </Form.Field>
        <Form.Field>
          <label>Informations utiles</label>
          <input placeholder='Motivation, poste souhaité...' />
        </Form.Field>
        <Form.Field required>
          <Checkbox label='Je suis cotisant au BDE-UTC'/>
        </Form.Field>
        <Button type='submit'>Envoyer</Button>
        <Button type='reset'>Effacer</Button>
      </Form>
    </>
  )
}

export default StudentForm;
