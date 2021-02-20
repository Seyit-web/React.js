
import React, { useEffect, useState } from 'react'
import s from './SendMessagesForm.module.css'
import send from './icons/send-button.svg'
import btnClip from './icons/paperclip.svg'
import btnSmile from './icons/smile.svg'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../../Redux/chatReducer'
import { GlobalStateType } from '../../../../Redux/reduxStore'


type PropsType = {}

export const SendMessagesForm: React.FC<PropsType> = () => {

    const [message, setMessage] = useState('')    
    const status = useSelector((state: GlobalStateType) => state.chat.status)

    const dispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) {
            return
        }

        dispatch(sendMessage(message))
        setMessage('')
    }
    
    return (
        <div className={s.container}>
                <a className={s.btnSmile} href="#">
                    <img width={20} src={btnSmile} alt=""/>
                </a>
                <a className={s.btnClip} href="#">
                    <img width={20} src={btnClip} alt=""/>
                </a>
            <div className={s.textarea}>
                <textarea onChange={ (e) => setMessage(e.currentTarget.value) } value={message} placeholder='Type a message' className={s.forSend}></textarea>
            </div>
            <div>
                <button disabled={ status !== 'ready' } onClick={ sendMessageHandler } className={s.btn}>
                    <img width={20} src={send} alt=""/>
                </button>
            </div>
        </div>
    )
}
