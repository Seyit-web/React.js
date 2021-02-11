
import { InferActionsTypes } from './reduxStore'


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


const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {
        case 'ADD_POST': 
            return {
                ...state,
                posts: [{id: 5, post: action.newPostText}, ...state.posts,],
            }
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPost: (newPostText: string) => ({ 
        type: 'ADD_POST', 
        newPostText 
    } as const)
}

export default profileReducer;