// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token).then((valid) => {
        if (valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      }).catch((error) => {
        console.error('Erreur lors de la vérification du token:', error);
        localStorage.removeItem('token');
      });
    }
 }, []);

 // Fonction pour vérifier la validité du token
 const verifyToken = async (token) => {
 try {
    const response = await fetch('http://localhost:8000/verify-token/', {
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
