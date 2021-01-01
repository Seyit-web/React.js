
import React from 'react';
import d from './Messages.module.css';
import Sms from './Sms/Sms';
import btnClip from './icons/paperclip.svg';
import btnSmile from './icons/smile.svg';
import { MessagesFormRedux } from './MessagesForm';

const Messages = (props) => {    

    let messagesElement = props.messages.map( m =>  <Sms sms={m.sms} key={m.id} /> );
    
    let addNewSend = (values) => {
        props.addSend(values.newMessageText)
    }

    return (
        <div className={d.messages}>
            <ul className={d.mIntro}>
                { messagesElement }
            </ul>

            <div className={d.chat}>
                <a className={d.btnSmile} href="#">
                    <img width={20} src={btnSmile} alt=""/>
                </a>
                <a className={d.btnClip} href="#">
                    <img width={20} src={btnClip} alt=""/>
                </a>
                <MessagesFormRedux onSubmit={addNewSend} />
            </div>
        </div>
    )
}

export default Messages;