
import { userAPI } from '../DAL/userAPI'
import { forUserReducer } from '../Components/Common/Helper/Helper'
import { UsersType } from '../Types/types'
import { Dispatch } from 'redux'
import { InferActionsTypes } from './reduxStore'
import { BaseThunkType } from './reduxStore'



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
        case 'FOLLOW':
            return {
                ...state,
                users: forUserReducer( state.users, 'id', action.userId, {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: forUserReducer( state.users, 'id', action.userId, {followed: false})
            }
        case 'SET_USERS': {
            return { ...state, users: action.users }
        }

        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }

        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.totalCount }
        }

        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }

        case 'BNT_FOLLOW': {
            return { ...state, btnFollow: action.isFetching ? [...state.btnFollow, action.userId] : state.btnFollow.filter(id => id !== action.userId)}
        }
        
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess:  (userId: number) => ({ type: 'FOLLOW', userId } as const),

    unfollowSuccess:  (userId: number) => ({ type: 'UNFOLLOW', userId } as const),

    setUsers:  (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),

    setCurrentPage:  (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),

    setTotalUsersCount:  (totalCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalCount } as const),

    setToggleIsFetching:  (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),

    setBtnFollow:  (isFetching: boolean, userId: number) => ({ type: 'BNT_FOLLOW', isFetching, userId } as const)
    // С помощю as const мы говорим, воспринимай их как константу. Без этого он не схавает, не может понят.
}



type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
    
// type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров.

export const requestUsers = (currentPage: number, pageSize: number): ThunkType =>{
    
    // It is  THUNK
    return async (dispatch) => {
        dispatch(actions.setToggleIsFetching(true));
        let data = await userAPI.getUsersFromApi(currentPage, pageSize);

            dispatch(actions.setToggleIsFetching(false));
            dispatch(actions.setUsers(data.items));            
            dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

export const getUsers2 = (pageNumber: number, pageSize: number): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setToggleIsFetching(true));
        let data = await userAPI.getUsersFromApi(pageNumber, pageSize);

        dispatch(actions.setToggleIsFetching(false));
        dispatch(actions.setUsers(data.items)); 
    }
}



const _followUnfollow = async (
    dispatch: DispatchType, userId: number, apiMethod: any, 
    actionCreator: (userId: number) => ActionsTypes
    ) => {

    dispatch(actions.setBtnFollow(true, userId));
    let response = await apiMethod(userId);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(actions.setBtnFollow(false, userId));
}

export const follow = (userId: number): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {
        _followUnfollow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess);
    }
}
export const unfollow = (userId: number): ThunkType =>{
    // It is  THUNK
    return async (dispatch) => {
        _followUnfollow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess);
    }
}

export default usersReducer