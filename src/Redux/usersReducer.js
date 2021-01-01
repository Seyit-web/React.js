
import { userAPI } from '../DAL/Api';

const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
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
        case FOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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

export const followSuccess = (userId) => ({ type: 'FOLLOW_SUCCESS', userId })

export const unfollowSuccess = (userId) => ({ type: 'UNFOLLOW_SUCCESS', userId })

export const setUsers = (users) => ({ type: 'SET_USERS', users })

export const setCurrentPage = (currentPage) => ({ type: 'SET_CURRENT_PAGE', currentPage })

export const setTotalUsersCount = (totalUsersCount) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount })

export const setToggleIsFetching = (isFetching) => ({ type: 'TOGGLE_IS_FETCHING', isFetching: isFetching })

export const setBtnFollow = (isFetching, userId) => ({ type: 'BNT_FOLLOW', isFetching: isFetching, userId: userId })


export const getUsers = ( currentPage, pageSize) =>{

    return (dispatch) => {
        dispatch(setToggleIsFetching(true));
        userAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setToggleIsFetching(false));
            dispatch(setUsers(data.items));            
            dispatch(setTotalUsersCount(data.totalCount));            
        })
    }

}

export const getUsers2 = (pageNumber, pageSize) =>{

    return (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(setToggleIsFetching(true));
        userAPI.getUsers(pageNumber, pageSize).then(data => { 
            dispatch(setToggleIsFetching(false));
            dispatch(setUsers(data.items)); 
        } );
    }

}

export const follow = (userId) =>{

    return (dispatch) => {
        dispatch(setBtnFollow(true, userId));

        userAPI.follow(userId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(setBtnFollow(false, userId));
        })
    }

}

export const unfollow = (userId) =>{

    return (dispatch) => {
        dispatch(setBtnFollow(true, userId));

        userAPI.unfollow(userId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(setBtnFollow(false, userId));
        })
    }

}


export default usersReducer;