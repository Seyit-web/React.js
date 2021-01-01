
import React from 'react';
import d from './Messages.module.css';
import Sms from './Sms/Sms';
import btnSend from './icons/send-button.svg';
import btnClip from './icons/paperclip.svg';
import btnSmile from './icons/smile.svg';

const Messages = (props) => {    

    let messagesElement = props.messages.map( m =>  <Sms sms={m.sms} key={m.id} /> );
    
    let newSendElement = React.createRef();

    let addSend = () => {
        props.addSend();
    }
    
    let sendMessage = () => {        
        let newMessageFromUi = newSendElement.current.value;
        props.updateNewSendMessage(newMessageFromUi);
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
                <textarea className={d.forSend} name="chat" placeholder="Type a message"  ref={newSendElement} value={props.newSendResult} onChange={sendMessage} />
                <button className={d.btn} onClick={ addSend }>
                    <img width={20} src={btnSend} alt=""/>
                </button>
            </div>
        </div>
    )
}
export default Messages;