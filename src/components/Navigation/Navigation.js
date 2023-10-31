import { Link, useLocation } from 'react-router-dom';
import profile from '../../images/profile.svg';
import './Navigation.css';
import { MENU } from '../../utils/menu';
import remove from '../../images/remove.svg';
import { useCallback, useEffect } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function Navigation ({ isMenuOpen, setIsMenuOpen }) {
    const { currentUser } = useCurrentUser();

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, [setIsMenuOpen]);
    const openMenu = () => setIsMenuOpen(true);

    const location = useLocation();
    const additinonalClassName = location.pathname === '/'
        ? ''
        : 'header__link_type_dark';

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeMenu]);

    return (
        <>
            <button type="button"
                    className={`header__menu-icon ${location.pathname === '/' ? 'header__menu-icon_type_white' : ''}`}
                    onClick={openMenu}
            />
            <div onClick={closeMenu} className={`overlay ${isMenuOpen ? 'overlay_opened' : ''}`}></div>
            <nav className={`header__nav ${isMenuOpen ? 'header__nav_opened' : ''}`}>
                <button type="button" className="header__close-menu" onClick={closeMenu}>
                    <img className="header__close-icon" src={remove} alt="закрыть"/>
                </button>
                {currentUser &&
                    <ul className="header__list">
                        {MENU.map((item) => (
                            <li key={item.id}
                                className={`header__item ${item.onlyMobile ? 'header__item_type_mobile' : ''}`}>
                                <Link to={item.link}
                                      onClick={closeMenu}
                                      className={`header__link ${additinonalClassName} ${location.pathname === item.link ? 'header__link_active' : ''}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                }
                <div className="header__profile">
                    {currentUser && <Link
                        to="/profile"
                        onClick={closeMenu}
                        className={`header__button header__button_rounded
                            ${location.pathname === '/'
                            ? ''
                            : 'header__button_theme_white'
                        }`}
                    >
                        Аккаунт
                        <img className="header__profile-img" src={profile} alt="аккаунт"/>
                    </Link>}

                    {location.pathname === '/' && !currentUser && <>
                        <Link
                            className={`header__link header__link_type_signup ${location.pathname !== '/' ? 'header__link_type_dark' : ''}`}
                            to="/signup">
                            Регистрация
                        </Link>
                        <Link className="header__button header__button_type_signin " to="/signin">
                            Войти
                        </Link>
                    </>
                    }
                </div>
            </nav>
        </>
    );
}

export default Navigation;
