import './FormLabel.css';

function FormLabel ({ additionalClass = '', children }) {
    return (
        <label className={`form__label ${additionalClass}`} htmlFor="">
            {children}
        </label>
    );
}

export default FormLabel;
