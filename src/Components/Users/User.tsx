
import userPhoto from '../Profile/Ava/img/ava.jpg'
import React, { FC } from 'react'
import us from './Users.module.css'
import { NavLink } from 'react-router-dom'
import { UsersType } from '../../Types/types'



type PropsType = {
    user: UsersType
    btnFollow: Array<number> 
    
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: FC<PropsType> = (props) => {
    
    let user = props.user

    return (
        <div className={us.userIntro}>
            <div className={us.userPhoto}>
                <NavLink  to={"/userProfile/" + user.id} >
                    <img className={us.userimg} src={ user.photos.small !=null ? user.photos.small : userPhoto } alt=""/>
                </NavLink>
                <div> { user.followed                              // It is  THUNK
                        ? <button disabled={props.btnFollow.some( id => id === user.id )} className={us.btn} onClick={ () => { props.unfollow(user.id) } }>UnFollow</button> 
                        : <button disabled={props.btnFollow.some( id => id === user.id )} className={us.btn} onClick={ () => { props.follow(user.id) } }>Follow</button>
                    }
                </div>
            </div>
            <div className={us.userDescr}>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
        </div>
    )
}

export default User