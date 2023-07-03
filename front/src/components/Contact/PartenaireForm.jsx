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

function PartenaireForm() {
  return (
    <>

      <Form>
        <Form.Field required>
          <label>Nom de l'entreprise/entité</label>
          <input placeholder='Entreprise sympa' />
        </Form.Field>
        <Form.Field required>
          <label>Objectif</label>
          <input placeholder='Je souhaite sponsoriser décibels' />
        </Form.Field>
        <Form.Field required>
          <label>Contact</label>
          <input placeholder='entreprise@mail.fr' />
        </Form.Field>
        <Button type='submit'>Envoyer</Button>
        <Button type='reset'>Effacer</Button>
      </Form>
    </>
  )
}

export default PartenaireForm;
