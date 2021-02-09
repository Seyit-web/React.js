
import React from 'react'
import l from './Login.module.css'
import { LoginReduxForm } from './LoginForm'
import { connect } from 'react-redux'
import { logIn } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'
import { GlobalStateType } from '../../Redux/reduxStore'



type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type LoginFormValuesTypeKeys  = Extract<keyof LoginFormValuesType, string>  // Получаем ключи! Это интересно. Здесь
    // Extract означает Извлекать. То есть мы извлекаем из поученных ключей только СТРОК!

type PropsType = MapDispatchPropsType & MapStatePropsType


const Login: React.FC<PropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: GlobalStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {logIn}) (Login);