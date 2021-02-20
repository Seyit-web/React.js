
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening } from '../../../Redux/chatReducer'
import { GlobalStateType } from '../../../Redux/reduxStore'
import Loader from '../../Common/Loader/Loader'
import { Messages } from './Messages/Messages'
import { SendMessagesForm } from './SendMessagesForm/SendMessagesForm'


type PropsType = {}

export const Chat: React.FC<PropsType> = () => {

    const dispatch = useDispatch()
    const status = useSelector((state: GlobalStateType) => state.chat.status)
    

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    

    return (
        <div>
            {status === 'error' && <Loader /> }            
                <>
                    <Messages />
                    <SendMessagesForm />
                </>
        </div>
    )
}
