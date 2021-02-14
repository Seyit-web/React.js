
import Messages from './Messages'
import { useSelector } from 'react-redux'
import { GlobalStateType } from '../../../Redux/reduxStore'
import React from 'react'


type PropsType = {}

export const MessagesContainer: React.FC<PropsType> = () => {

    const messages = useSelector((state: GlobalStateType) => state.dialogsPage.messages)
    
    return (
        <Messages messages={messages} />            
    )   
}

// export default compose( connect(mapStateToProps, { ...actions }) ) (Messages)
