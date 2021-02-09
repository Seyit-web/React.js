
import { userProfAPI, getProfileStatus, getUserPhoto, ResultCodeEnum } from '../DAL/Api';
import { stopSubmit } from 'redux-form';
import { ProfileType, PhotosType } from '../Types/types'

import { GlobalStateType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'


const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_USER_PHOTOS = 'SET_USER_PHOTOS';



let initialState = {
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState;

const userProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status }
        }
        case SET_USER_PHOTOS: {
            return { ...state, profile: {...state.profile, photos: action.photos} as ProfileType }
        }
        
        default:
            return state;
    }
}



type ActionsTypes = SetUserProfileActionType | SetUserStatusActionType | SetUserPhotoActionType

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });



type SetUserStatusActionType = {
    type: typeof  SET_USER_STATUS
    status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status });



type SetUserPhotoActionType = {
    type: typeof SET_USER_PHOTOS
    photos: PhotosType
}
export const setUserPhoto = (photos: PhotosType): SetUserPhotoActionType => ({ type: SET_USER_PHOTOS, photos });




type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров.

export const getUserStatus = (userId: number): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let response = await getProfileStatus.getStatus(userId);
            dispatch(setUserStatus(response.data));            
    }
}


export const updateUserStatus = (status: string): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let data = await getProfileStatus.updateStatus(status);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setUserStatus(status));            
        }
    }
}


export const saveUserPhoto = (userPhoto: any): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let response = await getUserPhoto.updateUserPhoto(userPhoto);
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(setUserPhoto(response.data.data.photos));            
        }
    }
}


export const setUser = (userId: number): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let response = await userProfAPI.setProfUser(userId);
        
            dispatch(setUserProfile(response.data));            
    }
}


export const profileFormDataSave = (formData: any) =>{
    // It is a THUNK
    return async (dispatch: any, getState: any) => {
            const userId = getState().auth.userId;
            let response = await userProfAPI.setProfileData(formData);
            
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setUserProfile(userId));            
            } else {
                dispatch(stopSubmit('editUserProfile', {_error: response.data.messages[0]}));
                return Promise.reject(response.data.messages[0]);
            }
    }
}

export default userProfileReducer;