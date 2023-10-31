import './FilterCheckbox.css';

function FilterCheckbox ({ isShort, setIsShort }) {
    return (
        <>
            <input checked={isShort}
                   onChange={(e) => setIsShort(e.target.checked)} className="search__toggle"
                   id="short-films"
                   type="checkbox"
            />
            <label className="search__label" htmlFor="short-films">Короткометражки</label>
        </>
    );
}

export default FilterCheckbox;
