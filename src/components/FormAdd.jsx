import React, { useState } from 'react';

import {
    FormInput,
    FormSelect,
    FormButton,
    Form, ModalActions, FormTextArea
} from 'semantic-ui-react';

const options1 = [
  { key: 'light', text: 'Light', value: 'light' },
  { key: 'son', text: 'Son', value: 'son' },
  { key: 'autre', text: 'Autre', value: 'autre' },
  { key: 'structure', text: 'Structure', value: 'structure' },
  { key: 'elec', text: 'Elec', value: 'elec' },
  { key: 'secu', text: 'Secu', value: 'secu' },

];
const options2 = [
  { key: 'neuf', text: 'Neuf', value: 'neuf' },
  { key: 'bien', text: 'Bien', value: 'bien' },
  { key: 'use', text: 'Usé', value: 'use' },
  { key: 'reparable', text: 'Réparable', value: 'reparable' },
  { key: 'casse', text: 'Cassé', value: 'casse' },
];

const FormAdd = (props) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    if (!values.reference) {
      newErrors.reference = "Référence obligatoire";
    }
    if (!values.price) {
      newErrors.price = "Prix obligatoire";
    }
    if (!values.quantity) {
      newErrors.quantity = "Quantité obligatoire";
    }
    if (!values.type) {
      newErrors.type = "Type obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (_, { name, value }) => setValues({ ...values, [name]: value });

  const handleSubmit = () => {
    const isValid = validateForm();
    const apiUrl = process.env.REACT_APP_API_URL;

    if (isValid) {

        const postData = {
          name: values.reference,
          brand: values.brand,
          price: values.price,
          description : values.description,
          type: values.type,
          quantity: values.quantity,
          state: values.state,
          power: values.power,
        };
        const token = localStorage.getItem('token');
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Token ${token}`
          },
          body: JSON.stringify(postData)
        };
        fetch(apiUrl, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Réponse de l\'API :', data);
            props.submission();
            props.closeModal();
          })
          .catch(error => {
            console.error('Erreur lors de la requête :', error);
          });

    }
  };

  return (
    <Form  onSubmit={handleSubmit} error={Object.keys(errors).length > 0}>
        <FormInput

          fluid
          label='Référence'
          placeholder='Référence'
          name='reference'
          onChange={handleChange}
          error={errors.reference && { content: errors.reference, pointing: 'below' }}
        />
        <FormInput

          fluid
          label='Marque'
          placeholder='Marque'
          name='brand'
          onChange={handleChange}
        />
        <FormSelect
          fluid
          label='Etat'
          options={options2}
          placeholder='Etat'
          name='state'
          onChange={(_, { value }) => setValues({ ...values, state: value })}
        />
        <FormInput

          fluid
          label='Prix'
          placeholder='Prix'
          type="number"
          step="any"
          min="0"
          name='price'
          onChange={handleChange}
          error={errors.price && { content: errors.price, pointing: 'below' }}
        />
        <FormInput

          fluid
          label='Puissance'
          placeholder='Puissance'
          type="number"
          min="0"
          name='power'
          onChange={handleChange}
          error={errors.power && { content: errors.power, pointing: 'below' }}
        />

        <FormInput

          fluid
          label='Quantité'
          placeholder='Quantité'
          type="number"
          min="1"
          name='quantity'
          onChange={handleChange}
        />
        <FormSelect

          fluid
          label='Type'
          options={options1}
          placeholder='Type'
          name='type'
          onChange={(_, { value }) => setValues({ ...values, type: value })}
        />
        <FormTextArea
            fluid
            label='description'
            placeholder='Description'
            name='description'
            onChange={handleChange}
            value={values.description}  
        />
        <ModalActions>
            <div className={"form-add-actions"}>
                <FormButton color='green' floated='right' content='Submit'>Valider</FormButton>
                <FormButton color='red' floated='right' onClick={props.closeModal}>Annuler</FormButton>
            </div>

        </ModalActions>

    </Form>
  );
};

export default FormAdd;
