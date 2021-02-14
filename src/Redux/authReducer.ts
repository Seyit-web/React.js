
import { headerAPI, ResultCodeForCaptchaEnum, ResultCodeEnum } from '../DAL/headerAPI'
import { securityAPI } from '../DAL/sequrityAPI'
import { stopSubmit, FormAction } from 'redux-form'
import { InferActionsTypes } from './reduxStore'
import { BaseThunkType } from './reduxStore'



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
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
        return {
                ...state,
                ...action.data
        }
        
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({  
        type: 'SET_USER_DATA', 
        data: {id, email, login, isAuth} 
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({  
        type: 'GET_CAPTCHA_URL_SUCCESS', 
        data: {captchaUrl} 
    } as const)
}


type ThunkType = BaseThunkType<ActionsTypes | FormAction>  // Вместо этого 
    // кода FormAction мы можем написать так ReturnType<typeof stopSubmit> и это будет работать корректно!
// type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров.

export const getLogin = (): ThunkType =>{
    return async (dispatch) => {

        let forLoginData = await headerAPI.forLogin();

            if (forLoginData.resultCode === ResultCodeEnum.Success) {
                let {id, email, login} = forLoginData.data;
                dispatch(actions.setAuthUserData(id, email, login, true));
            }
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => { 

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

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}


export const logOut = (): ThunkType =>{
    return async (dispatch) => {

        let response = await headerAPI.logOut();
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.setAuthUserData(null, null, null, false));
            }
    }
}

export default authReducer
