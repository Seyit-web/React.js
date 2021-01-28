
import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '701571a2-5aa3-4474-a9f2-e9f1e6078408'
    }
})

export const userAPI = {
    getUsersFromApi(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        })
    },

    follow(userId) { 
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId) { 
        return instance.delete(`follow/${userId}`)
    }
}


export const userProfAPI = {
    setProfUser(userId) {
        return instance.get(`profile/${userId}`)
    },
    setProfileData(formData) {
        return instance.put(`profile`, formData)
    }
}


export const getProfileStatus = {
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status} )
    }
}

export const getUserPhoto = {
    updateUserPhoto(userPhoto) {

        const formData = new FormData();
        formData.append("image", userPhoto);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
    }
}


export const headerAPI = {
    forLogin() {
        return instance.get(`auth/me`)
    },

    logIn(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },

    logOut() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}