import { Link } from 'react-router-dom';


function Navbar() {
    // JSX
    return (
        <nav className='nav container-padding'>
            <Link className='nav-link logo no-anchor-style' id='nav__home' to='/'>
                BLOGGO
            </Link>
            <Link className='nav-link no-anchor-style' id='nav__createpost' to='/create-post'>
                <i className="fas fa-edit"></i>
            </Link>
        </nav>
    );
}

export default Navbar;