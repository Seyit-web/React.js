
import React from 'react'
import d from './Dialogs.module.css'
import { MessagesContainer } from './Message/MessagesContainer'


type PropsType = {}

const Dialogs: React.FC<PropsType> = (props) => {
    

    return (
        <div className={d.mainDialogs}>
            <MessagesContainer />
        </div>
    )
}

export default Dialogs
