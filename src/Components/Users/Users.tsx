
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
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'



type PropsType = {}
type QueryParamsType = {term?: string, page?: string, friend?: string}

export const Users: FC<PropsType> = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize) // Эту строку можно написать
    // вот так:  const pageSize = useSelector((state: GlobalStateType) => state.usersPage.pageSize)
    const isFetching = useSelector(getIsFetching)
    const users = useSelector(getUsersCreateSelector)
    const btnFollow = useSelector(getBtnFollow)
    const filter = useSelector(getUsersFilter)


    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch(parsed.friend) {
            case 'null': 
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true': 
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false': 
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    
    useEffect(() => {
        
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        
        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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
