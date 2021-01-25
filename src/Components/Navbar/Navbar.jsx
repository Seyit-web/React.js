
import React from 'react';
import { NavLink } from 'react-router-dom';
import j from './Navbar.module.css';
import FContent from './FriendsContent/FContent';
import NavHeader from './NavHeader/NavHeader';
import { NavbarFormRedux } from './NavbarForm';
import cn from 'classnames';


const Navbar = (props) => {
    
    let FriendsElement = props.friendsContent.map( f => <FContent name={f.name} id={f.id} status={f.status} key={f.id} /> );

    let addNewFriend = (values) => {
        props.addFriend(values.newSearchFriend);
    }

    return (
        <div className={j.navbar}>

            <NavHeader />

            <div className={j.navbar__intro}>
                <div className={j.navbar__settings}>
                    <NavLink to="/profile" activeClassName={cn (j.active, j.setting)}>Profile</NavLink>
                    <NavLink to="/dialogs" activeClassName={cn (j.active, j.setting)}>Message</NavLink>
                    <NavLink to="/users" activeClassName={cn (j.active, j.setting)}>Users</NavLink>
                    <NavLink to="/userProfile" activeClassName={cn (j.active, j.setting)}>User profile</NavLink>
                    <NavLink to="/news" activeClassName={cn (j.active, j.setting)}>News</NavLink>
                    <NavLink to="/music" activeClassName={cn (j.active, j.setting)}>Music</NavLink>
                    <NavLink to="/settings" activeClassName={cn (j.active, j.setting)}>Settings</NavLink>
                </div>
            </div>
            <div className={j.friends}>
                <h3 className={j.fTitle}>Friends</h3>
                <div className={j.fContent}>
                    { FriendsElement }
                </div>
            </div>
            <NavbarFormRedux onSubmit={addNewFriend} />
        </div>
    )
}
export default Navbar;