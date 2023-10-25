import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import { CARDS } from '../../utils/testData';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

function MoviesCardList () {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <SectionComponent type="cards">
                        {CARDS
                        .slice(0, 5)
                        .map((card) => (
                            <MoviesCard key={card.id} id={card.id} name={card.name} liked={card.liked} />
                        ))}
                    </SectionComponent>
                    <SectionComponent type="more">
                        <button className="button__more">Ещё</button>
                    </SectionComponent>
                </>
            )}
        </>
    );
}

export default MoviesCardList;
