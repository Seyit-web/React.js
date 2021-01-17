
import { userAPI } from '../DAL/Api';
import { forUserReducer } from '../Components/Common/Helper/Helper';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const BNT_FOLLOW = 'BNT_FOLLOW';

let initialState = {
    users: [
        // {id: 1, photoUrl: ava, followed: true, fullName: 'Brian', status: 'I am a JavaScript developer!', location: { country: 'The USA', city: 'New York'}},
        // {id: 2, photoUrl: ava, followed: true, fullName: 'Mary', status: 'I am a buissnesman', location: { country: 'The Ukraine', city: 'Kiev'}},
        // {id: 3, photoUrl: ava, followed: false, fullName: 'Tom', status: 'I am a writer', location: { country: 'Russia', city: 'Moscow'}},
        // {id: 4, photoUrl: ava, followed: true, fullName: 'John', status: 'I am a makler', location: { country: 'Kazakstan', city: 'Nursultan'}},
        // {id: 5, photoUrl: ava, followed: false, fullName: 'Michael', status: 'I am a buissnesman', location: { country: 'Uzbekistan', city: 'Tashkent'}},
        // {id: 6, photoUrl: ava, followed: true, fullName: 'Smit', status: 'I am an acter', location: { country: 'America', city: 'Los Angelos'}}
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    btnFollow: []
};

const usersReducer = (state = initialState, action) => {

    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: forUserReducer( state.users, 'id', action.userId, {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: forUserReducer( state.users, 'id', action.userId, {followed: false})
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case BNT_FOLLOW: {
            return { ...state, btnFollow: action.isFetching
            ? [...state.btnFollow, action.userId]
            : state.btnFollow.filter(id => id !== action.userId)}
        }
        
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: 'FOLLOW', userId })

export const unfollowSuccess = (userId) => ({ type: 'UNFOLLOW', userId })

export const setUsers = (users) => ({ type: 'SET_USERS', users })

export const setCurrentPage = (currentPage) => ({ type: 'SET_CURRENT_PAGE', currentPage })

export const setTotalUsersCount = (totalUsersCount) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount })

export const setToggleIsFetching = (isFetching) => ({ type: 'TOGGLE_IS_FETCHING', isFetching })

export const setBtnFollow = (isFetching, userId) => ({ type: 'BNT_FOLLOW', isFetching, userId })


export const requestUsers = (currentPage, pageSize) =>{
    // It is  THUNK
    return async (dispatch) => {
        dispatch(setToggleIsFetching(true));
        let data = await userAPI.getUsersFromApi(currentPage, pageSize);

            dispatch(setToggleIsFetching(false));
            dispatch(setUsers(data.items));            
            dispatch(setTotalUsersCount(data.totalCount));            
    }
}

export const getUsers2 = (pageNumber, pageSize) =>{
    // It is  THUNK
    return async (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(setToggleIsFetching(true));
        let data = await userAPI.getUsersFromApi(pageNumber, pageSize);

            dispatch(setToggleIsFetching(false));
            dispatch(setUsers(data.items)); 
    }
}



const followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(setBtnFollow(true, userId));
    let response = await apiMethod(userId);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(setBtnFollow(false, userId));
}

export const follow = (userId) =>{
    // It is  THUNK
    return async (dispatch) => {
        followUnfollow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
    }
}
export const unfollow = (userId) =>{
    // It is  THUNK
    return async (dispatch) => {
        followUnfollow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    }
}

export default usersReducer;