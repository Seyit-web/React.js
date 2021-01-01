
import React from 'react';
import d from './Messages.module.css';
import btnSend from './icons/send-button.svg';
import { Field, reduxForm } from 'redux-form';

const MessagesForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={d.textarea}>
            <Field name='newMessageText' component='textarea' placeholder="Type a message" className={d.forSend} />
            <button className={d.btn}>
                <img width={20} src={btnSend} alt=""/>
            </button>
        </form>
    )
}

export const MessagesFormRedux = reduxForm({ form: 'addMessageForm' }) (MessagesForm)