import './FormInput.css';

function FormInput ({ value, onChange, placeholder, validationProps, additionalClass = '', inputType = 'text' }) {
    return (
        <input className={`form__input ${additionalClass}`}
               type={inputType}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               {...validationProps}
        />
    );
}

export default FormInput;
