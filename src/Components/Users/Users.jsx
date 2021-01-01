
import userPhoto from '../Profile/Ava/img/ava.jpg'
import React from 'react';
import us from './Users.module.css';
import Loader from '../Common/Loader/Loader';
import { NavLink } from 'react-router-dom';

const Users = (props) => {    

    let pagesCount = Math.ceil (props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={us.users}>

            { props.isFetching ? <Loader /> : null }

            <div className={us.number}>
                {pages.map( p => {
                    return <span className={ props.currentPage === p && us.bold } onClick={ (e) => { props.onPageChanged(p); } } key={p.id} >{p}</span>
                })}
            </div>

            {
                props.users.map( u => 
                    <div key={u.id}>
                        <div className={us.userIntro}>
                            <div className={us.userPhoto}>
                                <NavLink  to={"/userProfile/" + u.id} >
                                    <img className={us.userimg} src={ u.photos.small !=null ? u.photos.small : userPhoto } alt=""/>
                                </NavLink>
                                <div> { u.followed                              // It is  THUNK
                                        ? <button disabled={props.btnFollow.some( id => id === u.id )} className={us.btn} onClick={ () => { props.unfollow(u.id) } }>UnFollow</button> 
                                        : <button disabled={props.btnFollow.some( id => id === u.id )} className={us.btn} onClick={ () => { props.follow(u.id) } }>Follow</button>
                                    }
                                </div>
                            </div>
                            <div className={us.userDescr}>
                                <div>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                </div>
                                <div>
                                    <div>{'u.location.country'}</div>
                                    <div>{'u.location.city'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Users;