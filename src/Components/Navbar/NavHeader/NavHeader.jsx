
import React, { useState } from 'react';
import n from './NavHeader.module.css';
import ava from './icons/pharaoh.svg';
import * as more from 'react-icons/fi';
import * as  plus from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const NavHeader = (props) => {

    // const [sidebar, setSidebar] = useState(false);

    // const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className={n.navHeader}>
            <div className={n.navHeaderIntro}>
                <div className={n.navHeaderInner}>
                    <NavLink to="#">
                        <img width={40} src={ava} alt=""/>
                    </NavLink>
                </div>
                <div className={n.navHeaderInner}>
                    <div className={n.navHeaderItem}>
                        <NavLink className={n.link} to="#">
                            <plus.BsPlus style={{ fontSize: '30px' }} />
                        </NavLink>
                    </div>
                    <div className={n.navHeaderItem}>
                        <NavLink to="#">
                            <more.FiMoreHorizontal style={{  fontSize: '20px' }} />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavHeader;