
import { HighlightSpanKind } from 'typescript';
import { instance } from './Api'


type GetCaptchaType = {
    url: string
}

export const securityAPI = {
    async getCaptcha() {
        const response = await instance.get<GetCaptchaType>(`security/get-captcha-url`);
        return response.data.url
    }
}
