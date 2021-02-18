
import React, { useEffect, useState } from 'react'
import s from './SendMessagesForm.module.css'
import send from './icons/send-button.svg'
import btnClip from './icons/paperclip.svg'
import btnSmile from './icons/smile.svg'


type PropsType = {
    ws: WebSocket | null
}

export const SendMessagesForm: React.FC<PropsType> = (props) => {

    const [message, setMessage] = useState('')    
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')    


    useEffect( () => {

        const openHandler = () => {
            setReadyStatus('ready')
        }
        
        props.ws?.addEventListener('open', openHandler)
        
        return () => {
            props.ws?.removeEventListener('open', openHandler)
        }
    }, [props.ws])

    const sendMessage = () => {
        if (!message) {
            return
        }

        props.ws?.send(message)
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
                <button disabled={props.ws === null || readyStatus !== 'ready'} onClick={ sendMessage } className={s.btn}>
                    <img width={20} src={send} alt=""/>
                </button>
            </div>
        </div>
    )
}
