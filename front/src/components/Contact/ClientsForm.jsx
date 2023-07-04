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
import StudentForm from "./StudentForm";

function ClientsForm() {
  return (
    <>
      <Form>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
            <Form.Field>
              <Checkbox label="Pour une association de l'UTC" />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Checkbox label="Pour une autre entité" />
            </Form.Field>
          </Grid.Column>
        </Grid>
        <br/>
        <Form.Field required>
          <label>Nom de l'association/entité</label>
          <input placeholder='Festival de musique de compiègne' />
        </Form.Field>
        <Form.Field required>
          <label>Détail de la préstation</label>
          <input placeholder="Taille de l'evenement, nombre de scènes..." />
        </Form.Field>
        <Form.Field required>
          <label>Contact</label>
          <input placeholder='association@mail.fr' />
        </Form.Field>
        <Button type='submit'>Envoyer</Button>
        <Button type='reset'>Effacer</Button>
      </Form>
    </>
  )
}

export default ClientsForm;
