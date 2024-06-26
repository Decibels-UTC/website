// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isLoading, setIsLoading] = useState(true);
 const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token).then((valid) => {
        setIsAuthenticated(valid);
        setIsLoading(false);
      }).catch((error) => {
        console.error('Erreur lors de la vérification du token:', error);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
 }, []);

 
 const verifyToken = async (token) => {
 try {
    const response = await fetch(process.env.REACT_APP_API_URL+'verify-token/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, 
      },
    });
    if (!response.ok) {
      throw new Error('Token invalid');
    }
    return true;
 } catch (error) {
    console.log("une erreur est survenue");
    return false;
 }
};
 return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
 );
};
