
import {
    headerAPI,
    ResultCodeEnum,
    securityAPI,
    ResultCodeForCaptchaEnum
} from '../DAL/Api';
import { stopSubmit } from 'redux-form';

import { GlobalStateType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'

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


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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


type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

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



type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров.

export const getLogin = (): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {

        let forLoginData = await headerAPI.forLogin();

            if (forLoginData.resultCode === ResultCodeEnum.Success) {
                let {id, email, login} = forLoginData.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => { // Не мог использовать 
    // ThunkType потому что " dispatch(stopSubmit('login', {_error: message}));" дает ошибку.

    // It is  THUNK

    let response = await headerAPI.logIn(email, password, rememberMe, captcha);

        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(getLogin());
        } else {

            if (response.data.resultCode === ResultCodeForCaptchaEnum.Captcha) {
                dispatch(getCaptchaUrl());
            }

            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
}


export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaUrl = await securityAPI.getCaptcha();

    dispatch(getCaptchaUrlSuccess(captchaUrl));
}


export const logOut = (): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {

        let response = await headerAPI.logOut();
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthUserData(null, null, null, false));
            }
    }
}

export default authReducer;