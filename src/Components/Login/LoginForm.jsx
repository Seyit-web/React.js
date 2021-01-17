
import React from 'react';
import l from './Login.module.css';
import { reduxForm } from 'redux-form'
import { Input, createField } from '../Common/ForForms/ForForms';
import { required } from '../Common/Validation/Validation';

const LoginForm = (handleSubmit, error) => {

    return (
        <form onSubmit={handleSubmit} >
                { createField('email', 'Email', Input, [required]) }
                { createField('password', 'Password', Input, [required], {type: 'password'}) }
            
            { error && <div className={l.someError}>{error}</div> }

            <div className={l.forRememverMe}>
                { createField('rememberMe', 'null', Input, [], {type: 'checkbox'}, 'remeber me') }
            </div>
            <div>
                <button className={l.btn}>Log in</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
