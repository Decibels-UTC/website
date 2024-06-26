import React, {useContext, useEffect, useState} from 'react';
import { Form, FormInput, Button } from 'semantic-ui-react';
import {AuthContext} from "../context/AuthContext";
import {UserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

function LoginForm() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);
 const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
 const {userId, setUserId } = useContext(UserContext);


 const handleInputChange = (e, { name, value }) => {
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
 };

 const navigate = useNavigate(); // Obtenez la fonction de navigation

 useEffect(() => {
 if (isAuthenticated) {
      navigate('/inventory');
 }
}, [isAuthenticated]);
    const token = localStorage.getItem('token');

  const checkUserAuthentication = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'verify-token/', {
        method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          navigate('/inventory');
        }
      } else {
        console.log("Token expiré");
      }
    } catch (error) {
      console.log("Erreur lors de la vérification d'authentification", error);
    }
  };

useEffect(() => {
    if (token) {
      checkUserAuthentication();
    }
  }, []);

 const handleFormSubmit = async () => {
    try {

      const response = await fetch(process.env.REACT_APP_API_URL+'login/', {
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
        console.log(data)
        throw new Error(data.detail || 'Authentication failed');
      }
      const data = await response.json();
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('user_id', data.id);
      console.log(data.id);
      setUserId(data.id);
       navigate('/inventory');
    } catch (error) {
        console.log("raté")
      setError(error.message);
    }
 };

 return (
    <Form>
      <FormInput
        error={error ? { content: "Please enter your username", pointing: 'below' } : null}
        fluid
        placeholder='Username'
        id='username'
        name='username'
        value={username}
        onChange={handleInputChange}
      />
      <FormInput
        error={error ? { content: 'Please enter your password', pointing: 'below' } : null}
        fluid
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