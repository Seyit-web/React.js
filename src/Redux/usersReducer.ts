
import { userAPI } from '../DAL/Api'
import { forUserReducer } from '../Components/Common/Helper/Helper'
import { UsersType } from '../Types/types'
import { GlobalStateType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const BNT_FOLLOW = 'BNT_FOLLOW';



let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    btnFollow: [] as Array<number> // array of Users Id s
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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
            return { ...state, totalUsersCount: action.totalCount }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case BNT_FOLLOW: {
            return { ...state, btnFollow: action.isFetching ? [...state.btnFollow, action.userId] : state.btnFollow.filter(id => id !== action.userId)}
        }
        
        default:
            return state;
    }
}


type ActionsTypes = FollowSuccessActionType | UnFollowSuccessActionType | 
                    SetUsersActionType | SetCurrentPageActionType | 
                    SetTotalUsersCountActionType | SetToggleIsFetchingActionType | 
                    SetBtnFollowActionType


                    
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })



type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnFollowSuccessActionType => ({ type: UNFOLLOW, userId })



type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({ type: SET_USERS, users })



type SetCurrentPageActionType = {
    type: typeof  SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })



type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalCount })



type SetToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setToggleIsFetching = (isFetching: boolean): SetToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })



type SetBtnFollowActionType = {
    type: typeof  BNT_FOLLOW
    isFetching: boolean
    userId: number
}
export const setBtnFollow = (isFetching: boolean, userId: number): SetBtnFollowActionType => ({ type: BNT_FOLLOW, isFetching, userId })


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров.

export const requestUsers = (currentPage: number, pageSize: number): ThunkType =>{
    
    // It is  THUNK
    return async (dispatch) => {
        dispatch(setToggleIsFetching(true));
        let data = await userAPI.getUsersFromApi(currentPage, pageSize);

            dispatch(setToggleIsFetching(false));
            dispatch(setUsers(data.items));            
            dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const getUsers2 = (pageNumber: number, pageSize: number): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(setToggleIsFetching(true));
        let data = await userAPI.getUsersFromApi(pageNumber, pageSize);

        dispatch(setToggleIsFetching(false));
        dispatch(setUsers(data.items)); 
    }
}



const _followUnfollow = async (
    dispatch: DispatchType, userId: number, apiMethod: any, 
    actionCreator: (userId: number) => FollowSuccessActionType | UnFollowSuccessActionType
    ) => {

    dispatch(setBtnFollow(true, userId));
    let response = await apiMethod(userId);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(setBtnFollow(false, userId));
}

export const follow = (userId: number): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {
        _followUnfollow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess);
    }
}
export const unfollow = (userId: number): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {
        _followUnfollow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess);
    }
}

export default usersReducer;