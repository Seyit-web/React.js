
const ADD_SEND = 'ADD_SEND';
const UPDATE_NEW_SEND_MESSAGE = 'UPDATE_NEW_SEND_MESSAGE';

let initialState =  {
    messages: [
        {id: 1, sms: 'Hi'},
        {id: 2, sms: 'How are things?'},
        {id: 3, sms: 'I am fine, thank you!'}
    ],

    dialogs: [
        {id: 1, name: 'Peter'},
        {id: 2, name: 'Ann'},
        {id: 3, name: 'Tracy'},
        {id: 4, name: 'Bill'},
        {id: 5, name: 'Mark'},
        {id: 6, name: 'Peter'}
    ],

    newSendResult: ''
};

const dialogsReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_SEND: 
            return {
                ...state,
                messages: [...state.messages, {id: 5, sms: state.newSendResult}],
                newSendResult: ''
            };
        case UPDATE_NEW_SEND_MESSAGE:
            return {
                ...state,
                newSendResult: action.newMessageFromUi
            };
        default:
            return state;
    }
}

export const addSend = () => {
    return {
        type: 'ADD_SEND'
    }
}

export const updateNewSendMessage = (newMessageFromUi) => {
    return {
        type: 'UPDATE_NEW_SEND_MESSAGE', newMessageFromUi: newMessageFromUi
    }
}

export default dialogsReducer;