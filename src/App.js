
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
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { initializeApp } from './Redux/appReducer';
import Loader from './Components/Common/Loader/Loader';

class App extends React.Component {

    componentDidMount() {
        // It is  THUNK
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) {
            return <Loader />
        }

        return (
            <div className="main">
                <HeaderContainer />
                <div className="base">                
                    <NavbarContainer />
                    
                    <Route path='/dialogs' render={ () => <Dialogs store={this.props.store} /> } />
    
                    <Route path='/profile' render={ () => <Profile /> } />
    
                    <Route path='/users' render={ () => <UsersContainer /> } />
    
                    <Route path='/userProfile/:userId?' render={ () => <UserProfileContainer /> } />
                    
                    <Route path='/login' render={ () => <Login /> } />
                </div>
            </div>
      )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(connect(mapStateToProps, {initializeApp}), withRouter) (App) 