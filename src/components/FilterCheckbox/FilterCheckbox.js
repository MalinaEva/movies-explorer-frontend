import './FilterCheckbox.css';

function FilterCheckbox ({ isShort, onFilter }) {
    return (
        <>
            <input checked={isShort}
                   onChange={ () => onFilter(!isShort)}
                   className="search__toggle"
                   id="short-films"
                   type="checkbox"
            />
            <label className="search__label" htmlFor="short-films">Короткометражки</label>
        </>
    );
}

export default FilterCheckbox;
