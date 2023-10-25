import './FormComponent.css';

function FormComponent ({ formType, children }) {
    return (
        <form className={`form form_type_${formType}`} action="">
            {children}
        </form>
    );
}

export default FormComponent;
