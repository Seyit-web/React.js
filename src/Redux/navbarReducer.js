
const ADD_FRIEND = 'ADD_FRIEND';
const UPDATE_NEW_SEARCH_FRIEND = 'UPDATE_NEW_SEARCH_FRIEND';

let initialState =  {
    friendsContent: [
        {id: 1, name: 'Klara', status: 'online'},
        {id: 2, name: 'Mark', status: 'offline'},
        {id: 3, name: 'Bill', status: 'online'},
        {id: 4, name: 'Brain', status: 'deleted'}
    ],

    newSearchResult: ''
};

const navbarReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FRIEND: 
            return {
                ...state,
                friendsContent: [...state.friendsContent, {id: 5, name: state.newSearchResult, status: state.newSearchResult}],
                newSearchResult: ''
            }
        case UPDATE_NEW_SEARCH_FRIEND:
            return {
                ...state,
                newSearchResult: action.newFriendFromUi
            }
        default:
            return state;
    }
}

export const addFriend = () => {
    return {
        type: 'ADD_FRIEND'
    }
}

export const updateNewSearchFriend = (newFriendFromUi) => {
    return {
        type: 'UPDATE_NEW_SEARCH_FRIEND', newFriendFromUi: newFriendFromUi
    }
}

export default navbarReducer;