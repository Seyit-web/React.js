
import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import j from './Navbar.module.css'
import { NavbarFormType } from './Navbar'
import { createField, Textarea } from '../Common/ForForms/ForForms'
import { required } from '../Common/Validation/Validation'


type PropsType = {}

type NavbarFormTypeKeys = Extract<keyof NavbarFormType, string>

const NavbarForm: React.FC<InjectedFormProps<NavbarFormType, PropsType> & PropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={j.search}>

            { createField<NavbarFormTypeKeys>('newSearchFriend', 'search your friends', Textarea, [required]) }

            {/* <Field name='newSearchFriend' component='textarea' placeholder='search your friends' className={j.forText} /> */}
            <button className={j.btn}>Add friend</button>
        </form>
    )
}

export const NavbarFormRedux = reduxForm<NavbarFormType, PropsType>({ form: 'addNavbarForm' }) (NavbarForm)