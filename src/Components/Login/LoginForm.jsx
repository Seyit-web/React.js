
import React from 'react';
import l from './Login.module.css';
import { Field, reduxForm } from 'redux-form'
import { Input } from '../Common/ForForms/ForForms';
import { required } from '../Common/Validation/Validation';

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field name='email' className={l.email} placeholder='Login' component={Input} validate={[ required ]} />   
            </div>
            <div>
                <Field name='password' className={l.password} placeholder='Password' component={Input} validate={[ required ]} /> 
            </div>
            <div className={l.forRememverMe}>
                <Field name='rememberMe' className={l.rememverMe} type='checkbox' component='input' /> remeber me
            </div>
            <div>
                <button className={l.btn}>Log in</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
