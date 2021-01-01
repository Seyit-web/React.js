
const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

let initialState = {
    posts: [
        {id: 1, post: 'Hi, how are you?'},
        {id: 2, post: 'I am very happy'},
        {id: 3, post: 'Have you a quastion for me?'}
    ],

    newPostText: ''
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: 
            return {
                ...state,
                posts: [{id: 5, post: state.newPostText}, ...state.posts,],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT: 
        return {
            ...state,
            newPostText: action.newText
        }
        default:
            return state;
    }
}

export const addPost = () => {
    return {
        type: 'ADD_POST'
    }
}

export const updateNewPostText = (text) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT', newText: text
    }
}

export default profileReducer;