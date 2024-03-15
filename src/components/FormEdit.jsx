import React, { useState } from 'react';
import { FormInput, FormSelect, FormButton, Form, FormTextArea } from 'semantic-ui-react';

const options = [
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

const FormEdit = (props) => {
  const [values, setValues] = useState({
    reference: props.name,
    brand: props.brand,
    price: props.price,
    quantity: props.quantity,
    description: props.description,
    power:props.power,
    type: props.type,
    reason: props.reason,
    state: props.state,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (_, { name, value }) => setValues({ ...values, [name]: value });

  const handleSubmit = () => {
    const isValid = validateForm();

    const dataToUpdate = {
    name: values.reference,
    brand: values.brand,
    price: values.price,
    quantity : values.quantity,
    description: values.description,
    type :    values.type,
    power : values.power,
    modification_reason : values.reason,
    state: values.state,
    };
    const token = localStorage.getItem('token');

    if (isValid) {
      const apiUrl = process.env.REACT_APP_API_URL+'items/'+props.item_id+'/';
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Token ${token}`
        },
        body: JSON.stringify(dataToUpdate),
      };

      fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(updatedData => {
          console.log("Données mises à jour :", updatedData);
          props.submission();
          props.closeModal();
        })
        .catch(error => {
          console.error("Erreur lors de la mise à jour :", error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} error={Object.keys(errors).length > 0}>
      <FormInput
        fluid
        label='Référence'
        placeholder='Référence'
        name='reference'
        onChange={handleChange}
        error={errors.reference && { content: errors.reference, pointing: 'below' }}
        value={values.reference}
      />
      <FormInput
          fluid
          label='Marque'
          placeholder='Marque'
          name='brand'
          onChange={handleChange}
          value={values.brand}  // Correction : Utilisation de values au lieu de props
        />
      <FormSelect
          fluid
          label='Etat'
          options={options2}
          placeholder='Etat'
          name='state'
          onChange={(_, { value }) => setValues({ ...values, state: value })}
          value={values.state}  // Correction : Utilisation de values au lieu de props
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
          value={values.price}  // Correction : Utilisation de values au lieu de props
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
          value={values.power}  // Correction : Utilisation de values au lieu de props
        />

        <FormInput
          fluid
          label='Quantité'
          placeholder='Quantité'
          type="number"
          min="0"
          name='quantity'
          onChange={handleChange}
          value={values.quantity}  // Correction : Utilisation de values au lieu de props
        />
        <FormSelect
          fluid
          label='Type'
          options={options}
          placeholder='Type'
          name='type'
          onChange={(_, { value }) => setValues({ ...values, type: value })}
          value={values.type}  // Correction : Utilisation de values au lieu de props
        />
        <FormTextArea
            fluid
            label='description'
            placeholder='Description'
            name='description'
            onChange={handleChange}
            value={values.description}  
        />
        <FormTextArea
            fluid
            label='reason'
            placeholder='Raison de la modification'
            name='reason'
            onChange={handleChange}
            value={values.reason}  // Correction : Utilisation de values au lieu de props
        />
        <div className={"form-edit-actions"}>
            <FormButton color='green' floated='right' content='Submit'>Valider</FormButton>
            <FormButton color='red' floated='right' onClick={props.closeModal}>Fermer</FormButton>
        </div>


    </Form>
  );
};

export default FormEdit;
