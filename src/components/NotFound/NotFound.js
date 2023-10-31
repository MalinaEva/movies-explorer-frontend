import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';
import SectionComponent from '../SectionComponent/SectionComponent';

function NotFound () {
    const navigate = useNavigate();

    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <SectionComponent type="not-found">
            <h1 className="section__header section__header_type_not-found">404</h1>
            <p className="section__description section__description_type_not-found">Страница не найдена</p>
            <Link onClick={goBack} className="section__link" to="/">Назад</Link>
        </SectionComponent>
    );
}

export default NotFound;
