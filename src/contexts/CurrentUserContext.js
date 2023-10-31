import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../utils/MainApi';
import { useToast } from './ToastContext';

export const CurrentUserContext = createContext({
    currentUser: undefined,
    isLoading: true,
    setCurrentUser: () => {}
});

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const { addToast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCurrentUser(null);
            return;
        }

        getUserInfo(token)
        .then((userData) => {
            setCurrentUser(userData);
        }).catch((error) => {
            addToast(`${error.message || error}`);
            setCurrentUser(null);
        });
    }, [addToast]);

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
};
