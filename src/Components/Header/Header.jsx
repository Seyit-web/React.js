
import React from 'react';
import h from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className={h.header}>
            <div className="container">
                <div className={h.headerIntro}>
                    ShWhatsApp
                </div>
                <div className={h.loginBlock}>
                    { props.isAuth ? props.login :  <NavLink to='/login' >Login</NavLink> }
                </div>
            </div>
        </div>
    );
}
export default Header;