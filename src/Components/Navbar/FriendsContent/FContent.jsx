
import React from 'react';
import { NavLink } from 'react-router-dom';
import f from './FContent.module.css';
import avatar from './../img/ava-2.jpg'

const FContent = (props) => {

    let path = '/navbar/' + props.id;

    return (
        <div className={f.fPhoto}>
            <NavLink to={path}>
                <img src={avatar} alt=""/>
                <p>{props.name}</p>
                <p>{props.status}</p>
            </NavLink>
        </div>
    )
}
export default FContent;