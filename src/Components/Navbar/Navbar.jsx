
import React from 'react';
import { NavLink } from 'react-router-dom';
import j from './Navbar.module.css';
import FContent from './FriendsContent/FContent';
import NavHeader from './NavHeader/NavHeader';
import { NavbarFormRedux } from './NavbarForm';

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
                    <NavLink to="/profile" className={j.setting}>Profile</NavLink>
                    <NavLink to="/dialogs" className={j.setting}>Message</NavLink>
                    <NavLink to="/users" className={j.setting}>Users</NavLink>
                    <NavLink to="/userProfile" className={j.setting}>User profile</NavLink>
                    <NavLink to="/news" className={j.setting}>News</NavLink>
                    <NavLink to="/music" className={j.setting}>Music</NavLink>
                    <NavLink to="/settings" className={j.setting}>Settings</NavLink>
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