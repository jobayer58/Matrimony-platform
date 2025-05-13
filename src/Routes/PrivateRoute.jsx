import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Form, Navigate, useLocation } from 'react-router';
import PinkLoader from '../Pages/Shared/PinkLoader';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const location = useLocation()
    if (loading) {
        return <PinkLoader></PinkLoader>
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname} replace></Navigate>
};

export default PrivateRoute;