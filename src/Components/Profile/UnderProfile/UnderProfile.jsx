
import React from 'react'
import u from './UnderProfile.module.css'
import bg from '../Ava/img/ava.jpg'

const UnderProfile = (props) => {
    return (
            <div className={u.profile__intro}>
                <img src={bg} alt=""/>
            </div>
    )
}
export default UnderProfile
