
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
    }
}


export const headerAPI = {
    forLogin() {
        return instance.get(`auth/me`)
    },

    logIn(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },

    logOut() {
        return instance.delete(`auth/login`)
    }
}