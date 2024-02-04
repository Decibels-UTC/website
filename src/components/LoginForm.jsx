import React, {useContext, useState} from 'react';
import { Form, FormInput, Button } from 'semantic-ui-react';
import {AuthContext} from "../context/AuthContext";

function LoginForm() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);
 const { setIsAuthenticated } = useContext(AuthContext);

 const handleInputChange = (e, { name, value }) => {
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
 };

 const handleFormSubmit = async () => {
    try {
      // Remplacez 'YOUR_API_ENDPOINT' par l'URL de votre endpoint d'authentification
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Vérifiez si la réponse est OK
      if (!response.ok) {
        const data = await response.json();
        console.log("raté")
        throw new Error(data.detail || 'Authentication failed');
      }
      const data = await response.json();
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      window.location.href = '/inventory';
    } catch (error) {
        console.log("raté")
      setError(error.message);
    }
 };

 return (
    <Form>
      <FormInput
        error={error ? { content: error, pointing: 'below' } : null}
        fluid
        label='Username'
        placeholder='Username'
        id='username'
        name='username'
        value={username}
        onChange={handleInputChange}
      />
      <FormInput
        error={error ? { content: 'Please enter your password', pointing: 'below' } : null}
        fluid
        label='Password'
        placeholder='Password'
        type='password'
        name='password'
        value={password}
        onChange={handleInputChange}
      />
      <Button onClick={handleFormSubmit}>Submit</Button>
    </Form>
 );
}

export default LoginForm;