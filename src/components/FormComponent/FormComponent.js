import './FormComponent.css';

function FormComponent ({ formType, children, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className={`form form_type_${formType}`} action="/">
            {children}
        </form>
    );
}

export default FormComponent;
