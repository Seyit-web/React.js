
import axios from 'axios'
import { UsersType } from '../Types/types'


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '701571a2-5aa3-4474-a9f2-e9f1e6078408'
    }
})


export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null    // Это строку можно сделать следующим образом Nullable<string>
}
