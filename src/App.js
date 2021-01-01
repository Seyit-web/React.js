
import React from 'react';
import './App.css';
import Profile from './Components/Profile/Profile';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import Dialogs from './Components/Dialogs/Dialogs';
import UsersContainer from './Components/Users/UsersContainer';
import {Route} from 'react-router-dom';
import UserProfileContainer from './Components/UserProfile/UserProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';

const App = (props) => {
    return (
        <div className="main">
            <HeaderContainer />
            <div className="base">                
                <NavbarContainer />
                
                <Route path='/dialogs' render={ () => <Dialogs store={props.store} /> } />

                <Route path='/profile' render={ () => <Profile /> } />

                <Route path='/users' render={ () => <UsersContainer /> } />

                <Route path='/userProfile/:userId?' render={ () => <UserProfileContainer /> } />
                
                <Route path='/login' render={ () => <Login /> } />
            </div>
        </div>
  )
}

export default App;

// Если не можете попасть в Progile, Messages, Users или UserProfile
// пожалуйста сначало залогинтесь, или же уберите из кода 