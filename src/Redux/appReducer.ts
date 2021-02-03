
import { getLogin } from './authReducer';


const SET_INITIALIZED= 'SET_INITIALIZED';


export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch(action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}


type SetInitializedActionType = {
    type: typeof SET_INITIALIZED
}

export const setInitialized = (): SetInitializedActionType => ({ type: SET_INITIALIZED })


export const initializeApp = () =>{
    // It is  THUNK
    return (dispatch: any) => {

        let promise = dispatch(getLogin());

        promise.then(() => {
            dispatch(setInitialized())
        })
    }
}

export default appReducer;