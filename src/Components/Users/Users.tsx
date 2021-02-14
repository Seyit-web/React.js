
import React, { FC, useEffect } from 'react'
import us from './Users.module.css'
import Pagination from '../Common/Pagination/Pagination'
import User from './User'
import Loader from '../Common/Loader/Loader'
import { UsersSearchForm } from '../Common/Formik/UsersSearchForm'
import { follow, unfollow, requestUsers, FilterType } from '../../Redux/usersReducer'
import {
    getTotalUsersCount,
    getCurrentPage,
    getPageSize,
    getIsFetching,
    getUsersCreateSelector,
    getBtnFollow, 
    getUsersFilter
} from '../../Selectors/Selectors'

import { useSelector, useDispatch } from 'react-redux'



type PropsType = {}

export const Users: FC<PropsType> = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize) // Эту строку можно написать
    // вот так:  const pageSize = useSelector((state: GlobalStateType) => state.usersPage.pageSize)
    const isFetching = useSelector(getIsFetching)
    const users = useSelector(getUsersCreateSelector)
    const btnFollow = useSelector(getBtnFollow)
    const filter = useSelector(getUsersFilter)

    
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])


    const dispatch = useDispatch()
    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    
    const Follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const Unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }


    return (
        <div className={us.users}>

            { isFetching ? <Loader /> : null }    

            <UsersSearchForm onFilterChanged={onFilterChanged} />

            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize} 
            currentPage={currentPage} onPageChanged={onPageChanged} />

            {
                users.map( u => <User key={u.id} user={u} btnFollow={btnFollow} unfollow={Unfollow} follow={Follow} /> )
            }  
        </div>
    )
}
