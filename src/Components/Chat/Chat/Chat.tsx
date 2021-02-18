
import React, { useEffect, useState } from 'react'
import { Messages } from './Messages/Messages'
import { SendMessagesForm } from './SendMessagesForm/SendMessagesForm'


type PropsType = {}

export const Chat: React.FC<PropsType> = () => {

    const [ws, setWs] = useState<WebSocket | null>(null)


    useEffect( () => {
        let websocet: WebSocket

        const closeHandler =  () => {
            console.log('close ws')                
            setTimeout(createChannel, 3000)
        }
        
        function createChannel() {
            websocet?.removeEventListener('close', closeHandler)
            websocet?.close()

            websocet = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            websocet.addEventListener('close', closeHandler)
            setWs(websocet)
        }

        createChannel()

        return () => {
            websocet.removeEventListener('close', closeHandler)
            websocet.close()
        }
        
    }, [])
    

    return (
        <>
            <Messages ws={ws} />
            <SendMessagesForm ws={ws} />
        </>
    )
}
