
import React, { useEffect, useRef, useState } from 'react'   
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../../Redux/reduxStore'
import { Message } from './Message'


type PropsType = {}

export const Messages: React.FC<PropsType> = () => {

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)
    const messages = useSelector((state: GlobalStateType) => state.chat.messages)


    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if ( Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300 )
        {
            !isAutoScroll && setIsAutoScroll(true)  
        } else {
            isAutoScroll && setIsAutoScroll(false)           
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    
    
    return (
        <div style={{height: '500px', overflowY: 'auto'}} onScroll={scrollHandler}>
            { messages.map((m) => <Message key={m.id} message={m} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
