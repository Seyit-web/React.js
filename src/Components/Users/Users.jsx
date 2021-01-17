
import React from 'react';
import us from './Users.module.css';
import Pagination from '../Common/Pagination/Pagination';
import User from './User';
import Loader from '../Common/Loader/Loader';

const Users = (props) => {

    return (
        <div className={us.users}>

            { props.isFetching ? <Loader /> : null }    

            <Pagination totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} 
            currentPage={props.currentPage} onPageChanged={props.onPageChanged} />

            {
                props.users.map( u => <User key={u.id} user={u} btnFollow={props.btnFollow} unfollow={props.unfollow} follow={props.follow} /> )
            }  
        </div>
    )
}

export default Users;