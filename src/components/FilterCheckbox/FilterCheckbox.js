import './FilterCheckbox.css';

function FilterCheckbox () {
    return (
        <>
            <input className="search__toggle" id="short-films" type="checkbox"/>
            <label className="search__label" htmlFor="short-films">Короткометражки</label>
        </>
    );
}

export default FilterCheckbox;
