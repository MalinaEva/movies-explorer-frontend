import './FormInput.css';

function FormInput ({ name, value, onChange, placeholder, rules, error, additionalClass = '', inputType = 'text' }) {
    return (
        <>
            <input className={`form__input ${additionalClass}`}
                   type={inputType}
                   placeholder={placeholder}
                   name={name}
                   value={value}
                   onChange={onChange}
                   {...rules}
            />
            {error && <p className="form__error">{error}</p>}
        </>
    );
}

export default FormInput;
