import avatar from '../../images/avatar.png';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';
import SectionComponent from '../SectionComponent/SectionComponent';

function AboutMe () {
    return (
        <SectionComponent type="student">
            <h2 className="section__header">Студент</h2>
            <div className="student">
                <div className="student__info">
                    <h3 className="student__header">Виталий</h3>
                    <p className="student__subheader">Фронтенд-разработчик, 30 лет</p>
                    <p className="student__about">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
                        экономики СГУ. У&nbsp;меня есть жена
                        и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
                        С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс
                        по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной
                        работы.</p>
                    <a target="_blank" href="https://github.com/MalinaEva" className="student__link">Github</a>
                </div>
                <img className="student__avatar" src={avatar} alt="Виталий"/>
                <Portfolio/>
            </div>
        </SectionComponent>
    );
}

export default AboutMe;
