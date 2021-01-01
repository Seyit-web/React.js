
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import j from './Navbar.module.css';

const NavbarForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={j.search}>
            <Field name='newSearchFriend' component='textarea' placeholder='search your frinds' className={j.forText} />
            <button className={j.btn}>Add friend</button>
        </form>
    )
}

export const NavbarFormRedux = reduxForm({ form: 'addNavbarForm' }) (NavbarForm)