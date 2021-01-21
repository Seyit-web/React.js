
import React from 'react';
import uProf from '../UserProfile.module.css';

export const Contact = (props) => {
    return(
        <div className={uProf.contacts}>
            <b>{props.contactTitle}</b>: {props.contactValue}
        </div>
    )
}