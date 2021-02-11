
import { ProfileType } from '../Types/types'
import { instance } from './Api'


export const userProfAPI = {
    async setProfUser(userId: number) {
        const res = await instance.get<ProfileType>(`profile/${userId}`)
        return res.data
    },
    async setProfileData(formData: ProfileType) {
        const res = await instance.put(`profile`, formData)
        return res.data
    }
}