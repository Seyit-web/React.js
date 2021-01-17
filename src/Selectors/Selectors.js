
import { createSelector } from 'reselect'


const getUsers = (state) => {
    return state.usersPage.users;
}

export const getUsersCreateSelector = createSelector(getUsers, (users) => {
    return users.filter( u => true );
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getBtnFollow = (state) => {
    return state.usersPage.btnFollow;
}