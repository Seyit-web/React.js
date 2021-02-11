
import { getUserPhoto } from '../DAL/getUserPhoto'
import { userProfAPI } from '../DAL/userProfAPI'
import { getProfileStatus  } from '../DAL/getProfileStatus'
import { ResultCodeEnum  } from '../DAL/headerAPI'
import { FormAction, stopSubmit } from 'redux-form'
import { ProfileType, PhotosType } from '../Types/types'
import { BaseThunkType } from './reduxStore'
import { InferActionsTypes } from './reduxStore'



let initialState = {
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState;

const userProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {

        case 'SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'SET_USER_STATUS': {
            return { ...state, status: action.status }
        }
        case 'SET_USER_PHOTOS': {
            return { ...state, profile: {...state.profile, photos: action.photos} as ProfileType }
        }
        
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),

    setUserStatus: (status: string) => ({ type: 'SET_USER_STATUS', status } as const),

    setUserPhoto: (photos: PhotosType) => ({ type: 'SET_USER_PHOTOS', photos } as const)
}


type ThunkType = BaseThunkType<ActionsTypes | FormAction>
// type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров.

export const getUserStatus = (userId: number): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let data = await getProfileStatus.getStatus(userId);
            dispatch(actions.setUserStatus(data));            
    }
}


export const updateUserStatus = (status: string): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let data = await getProfileStatus.updateStatus(status);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setUserStatus(status));            
        }
    }
}


export const saveUserPhoto = (userPhoto: File): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let data = await getUserPhoto.updateUserPhoto(userPhoto);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setUserPhoto(data.data.photos));            
        }
    }
}


export const setUser = (userId: number): ThunkType =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let data = await userProfAPI.setProfUser(userId);
        
            dispatch(actions.setUserProfile(data));            
    }
}


export const profileFormDataSave = (formData: ProfileType): ThunkType =>{
    // It is a THUNK
    return async (dispatch, getState) => {
            const userId = getState().auth.id;
            let data = await userProfAPI.setProfileData(formData);
            
            if (data.resultCode === ResultCodeEnum.Success) {
                if (userId !== null) {
                    dispatch(getUserStatus(userId))        
                } else {
                    throw new Error('userId can\'t be null')
                }
            } else {
                dispatch(stopSubmit('editUserProfile', {_error: data.messages[0]}));
                return Promise.reject(data.messages[0])
            }
    }
}

export default userProfileReducer;