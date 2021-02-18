
import React, { useEffect, useState }  from 'react'   
import { ChatMessageType } from '../../ChatPage'
import { Message } from './Message'


type PropsType = {
    ws: WebSocket | null
}

export const Messages: React.FC<PropsType> = (props) => {

    const [messages, setmessages] = useState<ChatMessageType[]>([])


    useEffect(() => {

        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setmessages((prevMessage) => [...prevMessage, ...newMessages])
        }

        
        props.ws?.addEventListener('message', messageHandler)

        return  () => {
            props.ws?.removeEventListener('message', messageHandler)
        }
    }, [props.ws])
    
    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            { messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}
