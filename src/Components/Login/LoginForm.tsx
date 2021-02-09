
import React from 'react'
import l from './Login.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Input, createField } from '../Common/ForForms/ForForms'
import { required } from '../Common/Validation/Validation'
import { LoginFormValuesType } from './Login'
import { LoginFormValuesTypeKeys } from './Login'


type PropsType = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, PropsType> & PropsType> = ({handleSubmit, error, captchaUrl}) => {

    return (
        <form onSubmit={handleSubmit} >
                { createField<LoginFormValuesTypeKeys>('email', 'Email', Input, [required]) }
                { createField<LoginFormValuesTypeKeys>('password', 'Password', Input, [required], {type: 'password'}) }
            
            { error && <div className={l.someError}>{error}</div> }

            { captchaUrl && <img src={captchaUrl} alt='' /> }
            { captchaUrl && createField<LoginFormValuesTypeKeys>('captcha', 'Write the symbols', Input, [required]) }

                { createField<LoginFormValuesTypeKeys>('rememberMe', 'undefined', Input, [], {type: 'checkbox'}, 'remeber me') }
                
            <div>
                <button className={l.btn}>Log in</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<LoginFormValuesType, PropsType>({ form: 'login' })(LoginForm)
