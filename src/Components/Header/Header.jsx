
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
                    { props.isAuth ? <div>{props.login}  <button className={h.btn} onClick={props.logOut}>Log out</button></div> :  <NavLink to='/login' >Login</NavLink> }
                </div>
            </div>
        </div>
    );
}
export default Header;