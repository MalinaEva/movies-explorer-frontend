import { MAIN_API_BASE_URL } from './constants';

export const signUp = async (email, password, name) => {
    const response = await fetch(MAIN_API_BASE_URL + 'signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }

    if (data._id) {
        return data;
    }
    throw new Error(data.message || 'Не удалось зарегистрироваться');
};

export const signIn = async (email, password) => {
    const response = await fetch(MAIN_API_BASE_URL + 'signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }
    if (data.token) {
        return data;
    }
    throw new Error(data.message || 'Не удалось войти в систему');
};

export const getUserInfo = async (token) => {
    const response = await fetch(MAIN_API_BASE_URL + 'users/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }
    if (data) {
        return data;
    }
    throw new Error(data.message || 'Не удалось получить данные пользователя');
};

export const updateProfile = async (name, email, token) => {
    const response = await fetch(MAIN_API_BASE_URL + 'users/me', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }
    if (data) {
        return data;
    }
    throw new Error(data.message || 'Не удалось обновить данные пользователя');
};

export const getSavedMovies = async (token) => {
    const response = await fetch(MAIN_API_BASE_URL + 'movies', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }
    if (data) {
        return data;
    }
    throw new Error(data.message || 'Не удалось получить сохранённые фильмы');
};

export const saveMovie = async (movie, token) => {
    const response = await fetch(MAIN_API_BASE_URL + 'movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(movie),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }
    if (data) {
        return data;
    }
    throw new Error(data.message || 'Не удалось сохранить фильм');
};

export const deleteMovie = async (cardId, token) => {
    const response = await fetch(MAIN_API_BASE_URL + 'movies/' + cardId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }
    if (data) {
        return data;
    }
    throw new Error(data.message || 'Не удалось удалить фильм');
};
