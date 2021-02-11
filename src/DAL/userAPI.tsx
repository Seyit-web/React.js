
import { GetItemsType, instance } from './Api'
import { APIResponseType } from './headerAPI' 


export const userAPI = {

    async getUsersFromApi(currentPage: number, pageSize: number) {
        const res = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
        return res.data
    },

    follow(userId: number) { 
        return instance.post<APIResponseType>(`follow/${userId}`)
    },

    unfollow(userId: number) { 
        return instance.delete(`follow/${userId}`)
    }
}



//  IT WILL BE NECCESSERY IN THE FUTURE! )
// import { follow } from '../Redux/usersReducer'
// import { GetItemsType, instance } from './Api'
// import { APIResponseType } from './headerAPI' 


// export const userAPI = {

//     async getUsersFromApi(currentPage: number, pageSize: number) {
//         const res = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
//         return res.data
//     },

//     async follow(userId: number) { 
//         const res = await instance.post<APIResponseType>(`follow/${userId}`)
//         return res.data
//     },

//     unfollow(userId: number) { 
//         return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
//     }
// }
