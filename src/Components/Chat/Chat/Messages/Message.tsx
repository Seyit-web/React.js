
import React from 'react'   
import { ChatMessageAPIType } from '../../../../DAL/ChatAPI'


type PropsType = {
    message: ChatMessageAPIType
}

export const Message: React.FC<PropsType> = React.memo( ({message}) => {
    
    return (
        <div style={{ height: '100px' }}>
            <img style={{width: '60px', borderRadius: '50px'}} src={message.photo} alt="ava"/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>   
        </div>
    )
} )
