
import { getLogin } from './authReducer'
import { InferActionsTypes } from './reduxStore'


let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {
        case 'SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setInitialized:  () => ({ type: 'SET_INITIALIZED' } as const)
} 

export const initializeApp = () =>{
    // It is  THUNK
    return (dispatch: any) => {

        let promise = dispatch(getLogin());

        promise.then(() => {
            dispatch(actions.setInitialized())
        })
    }
}

export default appReducer;