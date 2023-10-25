import SectionComponent from '../SectionComponent/SectionComponent';
import { CARDS } from '../../utils/testData';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies () {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SearchForm/>
            {isLoading ? (
                <Preloader/>
            ) : (
                <SectionComponent type="cards">
                    {CARDS.filter(card => card.liked)
                    .slice(0, 2)
                    .map((card) => (
                        <MoviesCard key={card.id} id={card.id} name={card.name} liked={card.liked} isSaved={true}/>
                    ))}
                </SectionComponent>
            )}
        </>
    );
}

export default SavedMovies;
