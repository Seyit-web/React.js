
import { headerAPI, securityAPI } from '../DAL/Api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


// type InitialStateType = {
//     id: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
//     captchaUrl: string | null 
// }

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: any): InitialStateType => {

    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
        return {
                ...state,
                ...action.data,
        }
        
        default:
            return state;
    }
}


type DataActionType = {
    id: number  | null
    email: string  | null
    login: string  | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA 
    data: DataActionType 
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({  
    type: SET_USER_DATA, 
    data: {id, email, login, isAuth} 
})



type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    data: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({  
    type: GET_CAPTCHA_URL_SUCCESS, 
    data: {captchaUrl} 
})



export const getLogin = () =>{
    // It is  THUNK
    return async (dispatch: any) => {

        let response = await headerAPI.forLogin();

            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    // It is  THUNK

    let response = await headerAPI.logIn(email, password, rememberMe, captcha);

        if (response.data.resultCode === 0) {
            dispatch(getLogin());
        } else {

            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }

            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
}


export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
}


export const logOut = () =>{
    // It is  THUNK
    return async (dispatch: any) => {

        let response = await headerAPI.logOut();
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
    }
}

export default authReducer;