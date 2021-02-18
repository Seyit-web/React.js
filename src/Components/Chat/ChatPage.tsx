
import React from 'react'
import { Chat } from './Chat/Chat'


export type ChatMessageType =   {
    message: string
    photo: string
    userId: number
    userName: string
}


const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

export default ChatPage
