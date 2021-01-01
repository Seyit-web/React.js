
const ADD_FRIEND = 'ADD_FRIEND';

let initialState =  {
    friendsContent: [
        {id: 1, name: 'Klara', status: 'online'},
        {id: 2, name: 'Mark', status: 'offline'},
        {id: 3, name: 'Bill', status: 'online'},
        {id: 4, name: 'Brain', status: 'deleted'}
    ]
};

const navbarReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FRIEND: 
            return {
                ...state,
                friendsContent: [...state.friendsContent, {id: 5, name: action.newSearchFriend, status: action.newSearchFriend}]
            }
        default:
            return state;
    }
}

export const addFriend = (newSearchFriend) => ({ type: 'ADD_FRIEND', newSearchFriend })

export default navbarReducer;