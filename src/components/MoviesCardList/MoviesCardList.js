import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import { CARDS } from '../../utils/testData';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

function MoviesCardList () {
    const [isLoading, setIsLoading] = useState(true);
    const [cardLimit, setCardLimit] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 1279) {
                setCardLimit(16);
            } else if (width <= 1279 && width >= 768) {
                setCardLimit(8);
            } else {
                setCardLimit(5);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <SectionComponent type="cards">
                        <ul className="cards-list">
                            {CARDS.slice(0, cardLimit).map((card) => (
                                <li className="card-list__item" key={card.id}>
                                    <MoviesCard id={card.id} name={card.name} liked={card.liked}/>
                                </li>
                            ))}
                        </ul>
                    </SectionComponent>
                    <SectionComponent type="more">
                        <button type="button" className="section__button-more">Ещё</button>
                    </SectionComponent>
                </>
            )}
        </>
    );
}

export default MoviesCardList;
