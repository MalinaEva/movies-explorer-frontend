import './Portfolio.css';

function Portfolio () {
    return (
        <div className="student__portfolio">
            <h4 className="student__portfolio-header">Портфолио</h4>
            <ul className="student__portfolio-links">
                <li className="student__portfolio-item">
                    <a target="_blank" href="https://github.com/MalinaEva/russian-travel"
                       className="student__portfolio-link">Статичный
                        сайт</a>
                </li>
                <li className="student__portfolio-item">
                    <a target="_blank" href="https://github.com/MalinaEva/mesto" className="student__portfolio-link">Адаптивный
                        сайт</a>
                </li>
                <li className="student__portfolio-item">
                    <a target="_blank" href="https://github.com/MalinaEva/mesto-react"
                       className="student__portfolio-link">Одностраничное
                        приложение</a>
                </li>
            </ul>
        </div>
    );
}

export default Portfolio;
