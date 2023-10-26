import './FormLabel.css';

function FormLabel ({ additionalClass = '', children }) {
    return (
        <label className={`form__label ${additionalClass}`}>
            {children}
        </label>
    );
}

export default FormLabel;
