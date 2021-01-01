import React from 'react';
import { NavLink } from 'react-router-dom';
import d from './DialogItem.module.css';


const DialogItem = (props) => {

    let path = '/dialogs/' + props.id;

    return (
        <div className={d.dItem}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
};
export default DialogItem;