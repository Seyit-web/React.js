
import React from 'react';
import l from './Login.module.css'
import { LoginReduxForm } from './LoginForm';
import { connect } from 'react-redux';
import { logIn } from '../../Redux/authReducer';
import { Redirect } from 'react-router-dom';

const Login = (props) => {

    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={l.lofIntro}>
            <div className={l.example}>
                <h1 className={l.logTitle}>Login</h1>
                <p>
                        For logins, you can use this data:<br/>
                        <b>Email: free@samuraijs.com</b><br/>
                        <b>Password: free</b>
                </p>
            </div>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {logIn}) (Login);