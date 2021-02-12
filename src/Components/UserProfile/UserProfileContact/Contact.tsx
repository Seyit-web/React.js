
import React from 'react'
import uProf from '../UserProfile.module.css'


type PropsType = {
    contactValue: string
    contactTitle: string
}

export const Contact: React.FC<PropsType> = (props) => {
    return(
        <div className={uProf.contacts}>
            <b>{props.contactTitle}</b>: {props.contactValue}
        </div>
    )
}