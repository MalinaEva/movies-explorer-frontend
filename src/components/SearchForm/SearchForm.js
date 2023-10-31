import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SectionComponent from '../SectionComponent/SectionComponent';
import { useToast } from '../../contexts/ToastContext';

function SearchForm ({ onSubmit, keyword, isShort, setIsShort, onKeywordChange, errorMessage = '' }) {
    const { addToast } = useToast();

    const onSearch = (e) => {
        e.preventDefault();
        if (!keyword) {
            addToast('Нужно ввести ключевое слово');
            return;
        }
        onSubmit(keyword);
    };

    return (
        <SectionComponent type="search">
            <form onSubmit={onSearch} className="search" action="/">
                <div className="search__row">
                    <label className="sr-only" htmlFor="movie-search">Фильм</label>
                    <input value={keyword}
                           onChange={(e) => onKeywordChange(e.target.value)}
                           id="movie-search"
                           className="search__input" type="text" placeholder="Фильм"/>
                    <button className="search__submit" type="submit">Найти</button>
                </div>
                {errorMessage &&
                    <div className="search__row">
                        <p className="search__error">{errorMessage}</p>
                    </div>
                }
                <div className="search__row">
                    <FilterCheckbox isShort={isShort} setIsShort={setIsShort}/>
                </div>
            </form>
        </SectionComponent>
    );
}

export default SearchForm;
