import { Container, Divider, Header, Card, Icon, Grid } from 'semantic-ui-react';

function FormulaireCDV() {
  return (
    <>
      <br/>
      <Grid columns={1} divided>
        <Grid.Row>
          <Grid.Column>
            <Icon name="envelope" size="large" /> <a href="mailto:decibels@assos.utc.fr">decibels@assos.utc.fr</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
function ContactCard() {
  return (
    <>
      <br/><br/>
      <div>
        <Container Align='center'>
          <Card className="Contact-Card">
            <Card.Content className="Contact-Card-Content">
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
