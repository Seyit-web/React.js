
import React from 'react';
import l from './Login.module.css'
import { LoginReduxForm } from './LoginForm';
import { connect } from 'react-redux';
import { logIn } from '../../Redux/authReducer';
import { Redirect } from 'react-router-dom';

const Login = (props) => {

    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={l.lofIntro}>
            <h1 className={l.logTitle}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logIn}) (Login);