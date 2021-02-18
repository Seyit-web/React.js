
import React from 'react'   
import { ChatMessageType } from '../../ChatPage'


type PropsType = {
    message: ChatMessageType
}

export const Message: React.FC<PropsType> = ({message}) => {
    
    return (
        <div style={{ height: '100px' }}>
            <img style={{width: '60px', borderRadius: '50px'}} src={message.photo} alt="ava"/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>   
        </div>
    )
}
