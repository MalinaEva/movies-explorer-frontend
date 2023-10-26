import SectionComponent from '../SectionComponent/SectionComponent';
import { CARDS } from '../../utils/testData';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies () {
    const [isLoading, setIsLoading] = useState(true);
    const [cardLimit, setCardLimit] = useState(3);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setCardLimit(2);
            } else {
                setCardLimit(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <SearchForm/>
            {isLoading ? (
                <Preloader/>
            ) : (
                <SectionComponent type="cards">
                    <ul className="cards-list">
                        {CARDS.filter(card => card.liked)
                        .slice(0, cardLimit)
                        .map((card) => (
                            <li className="card-list__item" key={card.id}>
                                <MoviesCard id={card.id} name={card.name} liked={card.liked} isSaved={true}/>
                            </li>
                        ))}
                    </ul>
                </SectionComponent>

            )}
        </>
    );
}

export default SavedMovies;
