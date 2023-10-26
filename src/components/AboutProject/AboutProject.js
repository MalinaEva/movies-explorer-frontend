import './AboutProject.css';
import SectionComponent from '../SectionComponent/SectionComponent';

function AboutProject () {
    return (
        <SectionComponent type="about">
            <h2 className="section__header" id="about-project">О проекте</h2>
            <div className="about">
                <div className="about__info">
                    <div className="about__columns">
                        <div className="about__column">
                            <h3 className="about__column-title">Дипломный проект включал 5 этапов</h3>
                            <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление
                                функциональности и финальные доработки.</p>
                        </div>
                        <div className="about__column">
                            <h3 className="about__column-title">На выполнение диплома ушло 5 недель</h3>
                            <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                                соблюдать, чтобы успешно защититься.</p>
                        </div>
                    </div>
                    <div className="about__deadline">
                        <ul className="about__deadline-list">
                            <li className="about__deadline-item about__deadline-item_backend">
                                <div className="about__deadline-date">1 неделя</div>
                                <p className="about__deadline-description">Back-end</p>
                            </li>
                            <li className="about__deadline-item about__deadline-item_frontend">
                                <div className="about__deadline-date">4 недели</div>
                                <p className="about__deadline-description">Front-end</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </SectionComponent>
    );
}

export default AboutProject;
