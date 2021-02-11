
import { instance } from './Api'


type UpdateStatusType = {
    data: {}
    resultCode: number
    messages: Array<string>
}

export const getProfileStatus = {
    async getStatus(userId: number) {        
        const res = await instance.get<string>(`profile/status/${userId}`)
        return res.data
    },

    async updateStatus(status: string) {
        const res = await instance.put<UpdateStatusType>(`profile/status`, { status: status })
        return res.data
    }
}