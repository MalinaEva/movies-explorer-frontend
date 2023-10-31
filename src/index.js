import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import './vendor/fonts.css';
import App from './components/App/App';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import NotFound from './components/NotFound/NotFound';
import SavedMovies from './components/SavedMovies/SavedMovies';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute/UnauthenticatedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<Main/>}/>
                    <Route
                        path="movies"
                        element={<ProtectedRoute element={<Movies/>}/>}
                    />
                    <Route
                        path="saved-movies"
                        element={<ProtectedRoute element={<SavedMovies/>}/>}
                    />
                    <Route
                        path="profile"
                        element={<ProtectedRoute element={<Profile/>}/>}
                    />
                    <Route path="signin" element={<UnauthenticatedRoute element={<Login/>}/>}/>
                    <Route path="signup" element={<UnauthenticatedRoute element={<Register/>}/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
);
