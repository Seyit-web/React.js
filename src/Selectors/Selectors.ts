
import { createSelector } from 'reselect'
import { GlobalStateType } from "../Redux/reduxStore"



const getUsers = (state: GlobalStateType) => {
    return state.usersPage.users;
}

export const getUsersCreateSelector = createSelector(getUsers, (users) => {
    return users.filter( u => true );
})

export const getPageSize = (state: GlobalStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: GlobalStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: GlobalStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: GlobalStateType) => {
    return state.usersPage.isFetching;
}

export const getBtnFollow = (state: GlobalStateType) => {
    return state.usersPage.btnFollow;
}