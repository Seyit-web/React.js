
import React from 'react'
import h from './Header.module.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd'


type PropsType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <div className={h.header}>
            <div className="container">
                <div className={h.headerIntro}>
                    .sx01
                </div>
                <div className={h.loginBlock}>
                    { props.isAuth 
                    ? <div>{props.login}  <button className={h.btn} onClick={props.logOut}>Log out</button></div> 
                    :  <Link to='/login' ><button className={h.btn}>Log in</button></Link> }
                </div>
            </div>
        </div>
    );
}
export default Header
