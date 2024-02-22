import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../AuthContext';


const ProtectedRoute = ({ component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    console.log("Component", component)
    return isAuthenticated ? component: <Navigate to="/login" replace />
};

export default ProtectedRoute;
