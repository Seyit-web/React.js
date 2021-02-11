
import { instance } from './Api'
import { APIResponseType } from './headerAPI'
import { PhotosType } from '../Types/types'


type updateUserPhotoResponseDataType = {
    photos: PhotosType
}

export const getUserPhoto = {
    async updateUserPhoto(userPhoto: any) {

        const formData = new FormData();
        formData.append("image", userPhoto);
        const res = await instance.put<APIResponseType<updateUserPhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data
    }
}
