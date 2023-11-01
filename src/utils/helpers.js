export const convertDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);

    const formattedHrs = hrs > 0 ? `${hrs}ч ` : '';
    const formattedMins = mins > 0 ? `${mins}м ` : '';

    return `${formattedHrs}${formattedMins}`;
};

export const filterMovies = (results, keyword, isShort) => {
    return results.filter((movie) => {
        const nameMatch = movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(keyword.toLowerCase());

        const isShortFilm = movie.duration <= 40;

        return nameMatch && (isShort ? isShortFilm : true);
    });
};
