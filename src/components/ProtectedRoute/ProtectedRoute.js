import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function ProtectedRoute ({ element, ...props }) {
    const { currentUser } = useCurrentUser();
    const location = useLocation();

    if (currentUser === undefined) {
        return <Preloader/>;
    }

    return currentUser ? element : <Navigate to="/" state={{ from: location }}/>;
}
