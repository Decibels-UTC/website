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

 // Fonction pour vérifier la validité du token
 const verifyToken = async (token) => {
 try {
    const response = await fetch('http://localhost:8000/api/verify-token/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, // Utilisez 'Token ' au lieu de 'Bearer '
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
