// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
 const [isLoading, setIsLoading] = useState(true);
 const [userId, setUserId] = useState(-1);

useEffect(() => {
    const token = localStorage.getItem('token');
    const user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      setUserId(parseInt(user_id));
      //console.log(userId === 2)
      setIsLoading(false);
    } else if(token){
      getUserId(token).then((valid) => {
        setUserId(parseInt(valid));
        setIsLoading(false);
      }).catch((error) => {
        console.error('Erreur lors de la vérification du token:', error);
        setIsLoading(false);
      });
    }else{
      setIsLoading(false);
    }
 }, []);

 const getUserId = async (token) => {
 try {
    const response = await fetch(process.env.REACT_APP_API_URL+'user/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, 
      },
    });
    if (!response.ok) {
      throw new Error('Token invalid');
    }
    const data = await response.json();
    return data.id;
 } catch (error) {
    console.log("une erreur est survenue");
    return false;
 }
};
 return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
 );
};
