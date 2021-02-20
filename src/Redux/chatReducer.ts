
import { chatAPI, ChatMessageType, StatusType } from './../DAL/ChatAPI'

import { FormAction } from 'redux-form'
import { InferActionsTypes } from './reduxStore'
import { BaseThunkType } from './reduxStore'
import { Dispatch } from 'redux';




let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};



const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {
        case 'MESSAGES_RECEIVED':
        return {
            ...state,
            messages: [...state.messages,  ...action.payload.messages]
        }

        case 'STATUS_CHANGED':
        return {
            ...state,
            status: action.payload.status
        }
        
        default:
            return state;
    }
}


export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({  
        type: 'MESSAGES_RECEIVED',
        payload: {messages} 
    } as const),
    statusChanged: (status: StatusType) => ({  
        type: 'STATUS_CHANGED',
        payload: {status} 
    } as const)
}


let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {

    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}


let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {

    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe( 'messages-received', newMessagesHandlerCreator(dispatch) )
    chatAPI.subscribe( 'status-changed', statusChangedHandlerCreator(dispatch) )
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe( 'messages-received', newMessagesHandlerCreator(dispatch) )
    chatAPI.unsubscribe( 'status-changed', statusChangedHandlerCreator(dispatch) )
    chatAPI.stop()
}


export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer




export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>  // Вместо этого 
    // кода FormAction мы можем написать так ReturnType<typeof stopSubmit> и это будет работать корректно!
// type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров.
