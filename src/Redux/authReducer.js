import { headerAPI, securityAPI } from '../DAL/Api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
        return {
                ...state,
                ...action.data
            }
        
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({  type: 'SET_USER_DATA', data: {id, email, login, isAuth} });
export const getCaptchaUrlSuccess = (captchaUrl) => ({  type: 'GET_CAPTCHA_URL_SUCCESS', data: {captchaUrl} });


export const getLogin = () =>{
    // It is  THUNK
    return async (dispatch) => {

        let response = await headerAPI.forLogin();

            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
    }
}


export const logIn = (email, password, rememberMe, captcha) =>{
    // It is  THUNK
    return async (dispatch) => {

        let response = await headerAPI.logIn(email, password, rememberMe, captcha);

            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData());
            } else {

                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrl());
                }

                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}));
            }
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
}


export const logOut = () =>{
    // It is  THUNK
    return async (dispatch) => {

        let response = await headerAPI.logOut();
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
    }
}

export default authReducer;