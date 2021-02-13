
import React, { FC } from 'react'
import us from './Users.module.css'
import Pagination from '../Common/Pagination/Pagination'
import User from './User'
import Loader from '../Common/Loader/Loader'
import { UsersType } from '../../Types/types'
import { UsersSearchForm } from '../Common/Formik/UsersSearchForm'
import { FilterType } from '../../Redux/usersReducer'



type PropsType = {
    isFetching: boolean
    totalUsersCount: number
    pageSize: number
    currentPage: number

    users: Array<UsersType>
    btnFollow: Array<number>

    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: FC<PropsType> = (props) => {

    return (
        <div className={us.users}>

            { props.isFetching ? <Loader /> : null }    

            <UsersSearchForm onFilterChanged={props.onFilterChanged} />

            <Pagination totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} 
            currentPage={props.currentPage} onPageChanged={props.onPageChanged} />

            {
                props.users.map( u => <User key={u.id} user={u} btnFollow={props.btnFollow} unfollow={props.unfollow} follow={props.follow} /> )
            }  
        </div>
    )
}

export default Users
