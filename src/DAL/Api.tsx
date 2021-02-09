
import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '701571a2-5aa3-4474-a9f2-e9f1e6078408'
    }
})

export const userAPI = {
    getUsersFromApi(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        })
    },

    follow(userId: number) { 
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId: number) { 
        return instance.delete(`follow/${userId}`)
    }
}


export const userProfAPI = {
    setProfUser(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    setProfileData(formData: number) {
        return instance.put(`profile`, formData)
    }
}




type UpdateStatusType = {
    data: {}
    resultCode: number
    messages: Array<string>
}

export const getProfileStatus = {
    getStatus(userId: number) {        
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusType>(`profile/status`, {status: status} ).then(response => response.data)
    }
}



export const getUserPhoto = {
    updateUserPhoto(userPhoto: any) {

        const formData = new FormData();
        formData.append("image", userPhoto);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
    }
}




export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    Captcha = 10
}

type ForLoginType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}


type LogInType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const headerAPI = {
    forLogin() {
        return instance.get<ForLoginType>(`auth/me`).then(response => response.data)
    },

    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LogInType>(`auth/login`, { email, password, rememberMe, captcha })
    },

    logOut() {
        return instance.delete(`auth/login`)
    }
}


type GetCaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<GetCaptchaType>(`security/get-captcha-url`).then(response => response.data.url)
    }
}