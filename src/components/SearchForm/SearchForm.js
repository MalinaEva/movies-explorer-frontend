import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SectionComponent from '../SectionComponent/SectionComponent';

function SearchForm () {
    return (
        <SectionComponent type="search">
            <form className="search" action="">
                <div className="search__row">
                    <input className="search__input" type="text" placeholder="Фильм"/>
                    <button className="search__submit" type="submit">Найти</button>
                </div>
                <div className="search__row">
                    <FilterCheckbox/>
                </div>
            </form>
        </SectionComponent>
    );
}

export default SearchForm;
