
import React from 'react';
import { NavLink } from 'react-router-dom';
import j from './Navbar.module.css';
import FContent from './FriendsContent/FContent';
import NavHeader from './NavHeader/NavHeader';

const Navbar = (props) => {
    
    let FriendsElement = props.friendsContent.map( f => <FContent name={f.name} id={f.id} status={f.status} key={f.id} /> );

    let newSearchElement = React.createRef();

    let addFriend = () => {
        props.addFriend();
    }

    let searchFriend = () => {        
        let newFriendFromUi = newSearchElement.current.value;
        props.updateNewSearchFriend(newFriendFromUi);
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

            <div className={j.search}>
                <textarea className={j.forText} placeholder="search your frinds"  ref={newSearchElement} value={props.newSearchResult} onChange={searchFriend} />
                <button className={j.btn} onClick={ addFriend }>Add friend</button>
            </div>
        </div>
    )
}
export default Navbar;