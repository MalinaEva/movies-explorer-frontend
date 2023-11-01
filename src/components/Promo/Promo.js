import heroImage from '../../images/hero-image.svg';
import NavTab from '../NavTab/NavTab';
import './Promo.css';
import SectionComponent from '../SectionComponent/SectionComponent';

function Promo () {
    return (
        <SectionComponent type="hero">
            <div className="hero">
                <div className="hero__text">
                    <h1 className="hero__header">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="hero__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его
                        создателя.</p>
                    <NavTab/>
                </div>
                <img className="hero__image" src={heroImage} alt="мир веб"/>
            </div>
        </SectionComponent>
    );
}

export default Promo;
