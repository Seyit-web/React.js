
import React from 'react';
import l from './Login.module.css'
import { LoginReduxForm } from './LoginForm';

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div className={l.lofIntro}>
            <h1 className={l.logTitle}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;