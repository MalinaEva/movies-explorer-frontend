import './Footer.css';

function Footer () {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
                <p className="footer__copyright">&copy; 2023</p>
                <ul className="footer__links">
                    <li className="footer__link-item">
                        <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__link-item">
                        <a href="https://github.com/MalinaEva" className="footer__link">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
