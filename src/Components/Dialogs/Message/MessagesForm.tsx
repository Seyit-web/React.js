
import React from 'react'
import d from './Messages.module.css'
import btnSend from './icons/send-button.svg'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { MessagesFormType } from './Messages'


type PropsType = {}

type MessagesFormTypeKeys = Extract<keyof MessagesFormType, string>  // Эту строку кода можно сделать
    // короче. Внизу дана пример!

const MessagesForm: React.FC<InjectedFormProps<MessagesFormType, PropsType> & PropsType> = (props) => {

    return (    
        <form onSubmit={props.handleSubmit} className={d.textarea}>

            <Field name='newMessageText' component='textarea' placeholder="Type a message" className={d.forSend} />
            
            <button className={d.btn}>
                <img width={20} src={btnSend} alt=""/>
            </button>
        </form>
    )
}

export const MessagesFormRedux = reduxForm<MessagesFormType, PropsType>({ form: 'addMessageForm' }) (MessagesForm)


// Пример сокращения кода.
// type GetStringKeys<T> = Extract<keyof T, string>

// type MessagesFormTypeKeys = GetStringKeys<MessagesFormType>
