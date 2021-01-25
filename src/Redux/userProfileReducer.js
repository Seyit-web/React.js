
import { userProfAPI, getProfileStatus } from '../DAL/Api';
import { stopSubmit } from 'redux-form';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    profile: null,
    status: ''
};

const userProfileReducer = (state = initialState, action) => {

    switch(action.type) {

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status }
        }
        
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });


export const getUserStatus = (userId) =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let response = await getProfileStatus.getStatus(userId);
            dispatch(setUserStatus(response.data));            
    }
}
export const updateUserStatus = (status) =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let response = await getProfileStatus.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));            
        }
    }
}


export const setUser = (userId) =>{
    // It is a THUNK
    return async (dispatch) => {
        
        let response = await userProfAPI.setProfUser(userId);
        
            dispatch(setUserProfile(response.data));            
    }
}

export const profileFormDataSave = (formData) =>{
    // It is a THUNK
    return async (dispatch, getState) => {
            const userId = getState().auth.userId;
            let response = await userProfAPI.setProfileData(formData);

            if (response.data.resultCode === 0) {
                dispatch(setUserProfile(userId));            
            } else {
                dispatch(stopSubmit('editUserProfile', {_error: response.data.messages[0]}));
                return Promise.reject(response.data.messages[0]);
            }
    }
}

export default userProfileReducer;