
const ADD_POST = 'ADD_POST';

type PostsType = {
    id: number
    post: string
}

let initialState = {
    posts: [
        {id: 1, post: 'Hi, how are you?'},
        {id: 2, post: 'I am very happy'},
        {id: 3, post: 'Have you a quastion for me?'}
    ] as Array<PostsType>
}

export type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action: any): InitialStateType => {

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


type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPost = (newPostText: string) => ({ 
    type: 'ADD_POST', 
    newPostText 
})

export default profileReducer;