// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Loader
} from 'semantic-ui-react';
const ProtectedRoute = ({ element }) => {
 const { isAuthenticated, isLoading } = useContext(AuthContext);
 const location = useLocation();
 if (isLoading) {

    return <Loader size='massive'>Loading</Loader>;
 }
 console.log(isAuthenticated);
 return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
