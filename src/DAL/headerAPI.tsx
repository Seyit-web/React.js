
import { instance } from './Api'


export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    Captcha = 10
}



export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

type ForLoginResponseDataType = {
    id: number
    email: string
    login: string
}

type LogInResponseDataType = {
    userId: number
}

export const headerAPI = {
    async forLogin() {
        const response = await instance.get<APIResponseType<ForLoginResponseDataType>>(`auth/me`);
        return response.data
    },
    // forLogin() {
    //     return instance.get<APIResponseType<ForLoginResponseDataType>>(`auth/me`).then(response => response.data)
    // },

    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LogInResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
    },

    logOut() {
        return instance.delete(`auth/login`)
    }
}