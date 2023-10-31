import { MOVIES_BASE_URL } from './constants';

export const loadMovies = async () => {
    const response = await fetch(MOVIES_BASE_URL + '/beatfilm-movies');
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Ошибка: ${response.status}`);
    }
    if (data) {
        return data;
    }
    throw new Error(data.message || 'Не удалось получить фильмы');
};
