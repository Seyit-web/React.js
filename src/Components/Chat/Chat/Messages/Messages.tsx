
import React, { useEffect, useRef } from 'react'   
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../Redux/reduxStore'
import { Message } from './Message'


type PropsType = {}

export const Messages: React.FC<PropsType> = () => {

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: GlobalStateType) => state.chat.messages)

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    
    
    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            { messages.map((m, index) => <Message key={index} message={m} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
