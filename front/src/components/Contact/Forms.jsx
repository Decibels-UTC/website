import React, { useState } from 'react';
import {
  Divider,
  Grid,
  Accordion,
  Icon,
  Header,
} from 'semantic-ui-react';
import StudentForm from "./StudentForm";
import ClientsForm from "./ClientsForm";
import PartenaireForm from "./PartenaireForm";

function Forms() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Grid columns={4} relaxed='very' centered>
      <Grid.Column>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name='dropdown' />
              <Icon name="student" size="large" />
              <Header textAlign={"center"}>Je suis étudiant et je souhaite rejoindre Décibels</Header>
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <div className={"Formulaire-Triple"}>
              <StudentForm />
            </div>
          </Accordion.Content>
        </Accordion>
      </Grid.Column>
      <Grid.Column width={1}>
        <Divider vertical>Ou</Divider>
      </Grid.Column>
      <Grid.Column>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name='dropdown' />
              <Icon name="building" size="large" />
              <Header textAlign={"center"}>Je suis une entité et j'ai besoin de Décibels</Header>
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <div className={"Formulaire-Triple"}>
              <ClientsForm />
            </div>
          </Accordion.Content>
        </Accordion>
      </Grid.Column>
      <Grid.Column width={1}>
        <Divider vertical>Ou</Divider>
      </Grid.Column>
      <Grid.Column>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name='dropdown' />
              <Icon name="dollar" size="large" />
              <Header textAlign={"center"}>Je souhaite sponsoriser Décibels</Header>
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <div className={"Formulaire-Triple"}>
              <PartenaireForm />
            </div>
          </Accordion.Content>
        </Accordion>
      </Grid.Column>
    </Grid>
  );
}

export default Forms;
