
import React from 'react'
import l from './Login.module.css'
import { LoginReduxForm } from './LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { logIn } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'
import { GlobalStateType } from '../../Redux/reduxStore'


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type LoginFormValuesTypeKeys  = Extract<keyof LoginFormValuesType, string>  // Получаем ключи! Это интересно. Здесь
    // Extract означает Извлекать. То есть мы извлекаем из поученных ключей только СТРОКИ!

type PropsType = {}


export const Login: React.FC<PropsType> = () => {

    const isAuth = useSelector((state: GlobalStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: GlobalStateType) => state.auth.captchaUrl)

    const dispatch = useDispatch()    

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(logIn(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
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
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}
