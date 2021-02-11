
import { InferActionsTypes } from './reduxStore'


type FriendsContentType = {
    id: number
    name: string
    status: string
}

let initialState =  {
    friendsContent: [
        {id: 1, name: 'Klara', status: 'online'},
        {id: 2, name: 'Mark', status: 'offline'},
        {id: 3, name: 'Bill', status: 'online'},
        {id: 4, name: 'Brain', status: 'deleted'}
    ] as Array<FriendsContentType>
}

export type InitialStateType = typeof initialState;

const navbarReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'ADD_FRIEND': 
        let text = action.newSearchFriend
            return {
                ...state,
                friendsContent: [...state.friendsContent, {id: 5, name: text, status: text}]
            }
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addFriend: (newSearchFriend: string) => ({ 
        type: 'ADD_FRIEND', 
        newSearchFriend 
    } as const)
}

export default navbarReducer;