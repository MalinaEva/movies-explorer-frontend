import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App () {
    const location = useLocation();
    const withoutFooter = ['/signin', '/signup', '/profile'];

    return (
        <div className="page">
            {location.pathname === '/' && <Header login={true}/>}
            {location.pathname === '/' ? <Header login={false}/> : <Header login={true}/>}
            <main className="content">
                <Outlet/>
            </main>
            { !withoutFooter.includes(location.pathname) && <Footer/>}
        </div>
    );
}

export default App;
