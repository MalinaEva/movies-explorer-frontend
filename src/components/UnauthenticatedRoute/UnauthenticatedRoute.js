import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

export default function UnauthenticatedRoute ({ element, ...props }) {
    const { currentUser } = useCurrentUser();
    const location = useLocation();

    return !currentUser ? element : <Navigate to="/" state={{ from: location }}/>;
}
