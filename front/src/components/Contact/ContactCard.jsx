import { Container, Divider, Header, Card, Icon, Grid } from 'semantic-ui-react';

function FormulaireCDV() {
  return (
    <>
      <Grid columns={1} divided>
        <Grid.Row>
          <Grid.Column>
            <Icon name="envelope" size="large" /> decibels@assos.utc.fr
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}


function ContactCard(props) {
  return (
    <>
      <div>
        <Container Align='center'>
          <Card className="Contact-Card">
            <Card.Content>
              <Icon name="envelope" size="huge" />
              <Card.Header>Nous contacter</Card.Header>
              <Card.Description>
                <FormulaireCDV />
              </Card.Description>
            </Card.Content>
          </Card>
        </Container>
      </div>
    </>
  );
}
export default ContactCard;
