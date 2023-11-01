import './FormButton.css';

function FormButton ({ type, children, disabled, buttonType = 'button' }) {
    return (
        <button disabled={disabled} type={buttonType}
                className={`form__btn form__btn_type_${type} ${disabled ? 'form__btn_disabled' : ''}`}>{children}</button>
    );
}

export default FormButton;
