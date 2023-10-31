import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Toast from '../Toast/Toast';
import { useState } from 'react';
import { ToastContext } from '../../contexts/ToastContext';
import { CurrentUserProvider } from '../../contexts/CurrentUserContext';
import { MoviesProvider } from '../../contexts/MoviesContext';

function App () {
    const location = useLocation();
    const withoutFooter = ['/signin', '/signup', '/profile'];
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'error') => {
        setToasts((prevToasts) => [...prevToasts, {
            message: message,
            type: type
        }]);
    };
    const removeToast = (message) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.message !== message));
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <CurrentUserProvider>
                <div className="page">
                    <Header/>
                    <main className="content">
                        <MoviesProvider>
                            <Outlet/>
                        </MoviesProvider>
                    </main>
                    {!withoutFooter.includes(location.pathname) && <Footer/>}

                    {toasts.map((toast, index) => (
                        <Toast
                            key={index}
                            message={toast.message}
                            type={toast.type}
                            duration={1000}
                            onClose={() => removeToast(toast.message)}
                        />
                    ))}
                </div>
            </CurrentUserProvider>
        </ToastContext.Provider>
    );
}

export default App;
