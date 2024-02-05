import { Button } from 'semantic-ui-react';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LogoutButton() {
 const { setIsAuthenticated } = useContext(AuthContext);

 const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }
      // Supprimer le token du local storage
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
 };

 return (
    <Button onClick={handleLogout} color='red'>
      Logout
    </Button>
 );
}

export default LogoutButton;
