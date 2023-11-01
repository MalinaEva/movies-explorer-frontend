import './Techs.css';
import SectionComponent from '../SectionComponent/SectionComponent';

function Techs () {
    return (
        <SectionComponent type="tech">
            <h2 className="section__header section__header_type_tech">Технологии</h2>
            <div className="tech">
                <h3 className="tech__header">7 технологий</h3>
                <p className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
                    проекте.</p>
                <ul className="tech__buttons">
                    <li className="tech__button">HTML</li>
                    <li className="tech__button">CSS</li>
                    <li className="tech__button">JS</li>
                    <li className="tech__button">React</li>
                    <li className="tech__button">Git</li>
                    <li className="tech__button">Express.js</li>
                    <li className="tech__button">mongoDB</li>
                </ul>
            </div>
        </SectionComponent>
    );
}

export default Techs;
