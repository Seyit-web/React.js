import { headerAPI } from '../DAL/Api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({  type: 'SET_USER_DATA', data: {id, email, login, isAuth} })


export const getLogin = () =>{
    // It is  THUNK
    return (dispatch) => {

        return  headerAPI.forLogin().then(response => {
                    if (response.data.resultCode === 0) {
                        let {id, email, login} = response.data.data;
                        dispatch(setAuthUserData(id, email, login, true));
                    }
                })
    }
}


export const logIn = (email, password, rememberMe) =>{
    // It is  THUNK
    return (dispatch) => {

        headerAPI.logIn(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}));
            }
        })
    }
}

export const logOut = () =>{
    // It is  THUNK
    return (dispatch) => {

        headerAPI.logOut().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
    }
}

export default authReducer;