import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import { useState } from 'react';

function Header ({ login = false }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();

    let additinonalClassName = location.pathname === '/'
        ? ''
        : 'header_type_white';

    const authRoutes = ['/signup', '/signin'];

    if (authRoutes.includes(location.pathname)) {
        additinonalClassName += ' header_type_small';
    }

    const additionalContainerClass = authRoutes.includes(location.pathname)
        ? 'header__container_type_small header__container_layout_auth'
        : '';

    return (
        <header className={`header ${additinonalClassName}`}>
            <div className={`header__container ${additionalContainerClass}`}>
                <Link to="/">
                    <img className="header__logo" src={logo} alt="Логотип"/>
                </Link>

                {authRoutes.includes(location.pathname) ? '' : <Navigation isMenuOpen={isMenuOpen}
                                                                           setIsMenuOpen={setIsMenuOpen}
                                                                           login={login}
                />}
            </div>
        </header>
    );
}

export default Header;
