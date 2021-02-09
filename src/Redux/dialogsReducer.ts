
const ADD_SEND = 'ADD_SEND'


type MessagesType = {
    id: number
    sms: string
}

let initialState =  {
    messages: [
        {id: 1, sms: 'Hi'},
        {id: 2, sms: 'How are things?'},
        {id: 3, sms: 'I am fine, thank you!'}
    ] as Array<MessagesType>
}

export type InitialStateActionType = typeof initialState



const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateActionType => {

    switch(action.type) {
        case ADD_SEND: 
        let text = action.newMessageText
            return {
                ...state,
                messages: [...state.messages, {id: 5, sms: text}]
            }
        default:
            return state;
    }
}


type ActionsTypes = AddSendActionType

type AddSendActionType = {
    type: typeof ADD_SEND
    newMessageText: string
}
export const addSend = (newMessageText: string): AddSendActionType => ({ 
    type: 'ADD_SEND', 
    newMessageText 
})

export default dialogsReducer