import './SectionComponent.css';

function SectionComponent ({ type, children }) {
    return (
        <section className={`section section_type_${type}`}>
            {children}
        </section>
    );
}

export default SectionComponent;
