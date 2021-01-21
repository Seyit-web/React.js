
import { userProfAPI } from '../DAL/Api';

const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    profile: null
};

const userProfileReducer = (state = initialState, action) => {

    switch(action.type) {

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })


export const setUser = (userId) =>{
    // It is  THUNK
    return async (dispatch) => {
        
        let response = await userProfAPI.setProfUser(userId);
        
            dispatch(setUserProfile(response.data));            
    }
}

export const profileFormDataSave = (formData) =>{
    // It is  THUNK
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await userProfAPI.setProfileData(formData);

        if (response.data.resultCode === 0) {
            dispatch(setUserProfile(userId));            
        }
    }
}


export default userProfileReducer;