
const ADD_POST = 'ADD_POST';

let initialState = {
    posts: [
        {id: 1, post: 'Hi, how are you?'},
        {id: 2, post: 'I am very happy'},
        {id: 3, post: 'Have you a quastion for me?'}
    ]
}

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: 
            return {
                ...state,
                posts: [{id: 5, post: action.newPostText}, ...state.posts,],
            }
        default:
            return state;
    }
}

export const addPost = (newPostText) => ({ type: 'ADD_POST', newPostText })

export default profileReducer;