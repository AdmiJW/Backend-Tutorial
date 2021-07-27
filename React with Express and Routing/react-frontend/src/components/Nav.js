
// NavLink is a upgraded version of Link
// When the route matches, a className of 'active' (default and overridable) will be appended to the link
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className='navbar navbar-dark text-white bg-dark px-3'>
            <NavLink to='/' className='navbar-brand fs-2'>React, Express and Router</NavLink>
            <ul className='navbar-nav flex-row gap-3 align-self-center fs-4'>
                <li className='nav-item'>
                    <NavLink exact to='/' className='nav-link'>Home</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink exact to='/about' className='nav-link'>About</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink exact to='/contacts' className='nav-link'>Contacts</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;