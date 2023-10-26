import './FormButton.css';

function FormButton ({ type, children, buttonType = 'button' }) {
    return (
        <button type={buttonType} className={`form__btn form__btn_type_${type}`}>{children}</button>
    );
}

export default FormButton;
