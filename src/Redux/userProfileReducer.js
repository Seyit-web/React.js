
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
    return (dispatch) => {

        userProfAPI.setProfUser(userId).then(response => {
            dispatch(setUserProfile(response.data));            
         })
    }

}

export default userProfileReducer;