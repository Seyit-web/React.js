
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import navbarReducer from './navbarReducer';

let store = {

    _state: {
        profilePage: {
            posts: [
                {id: 1, post: 'Hi, how are you?'},
                {id: 2, post: 'I am very happy'},
                {id: 3, post: 'Have you a quastion for me?'}
            ],
    
            newPostText: ''
        },
    
        dialogsPage: {
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
        },
    
        navbarPage: {
            friendsContent: [
                {id: 1, name: 'Klara', status: 'online'},
                {id: 2, name: 'Mark', status: 'offline'},
                {id: 3, name: 'Bill', status: 'online'},
                {id: 4, name: 'Brain', status: 'deleted'}
            ],
    
            newSearchResult: ''
        }
    },

    
    _callSubscriber () {
        console.log('State changed');
    },


    getState () {
        return this._state;
    },


    subscribe (observer) {
        this._callSubscriber = observer;
    },   

    dispatch (action) {       
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navbarPage = navbarReducer(this._state.navbarPage, action); 

        this._callSubscriber(this._state);
    }
}
export default store;