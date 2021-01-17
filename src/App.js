
import React, { Suspense } from 'react';
import './App.css';
import NavbarContainer from './Components/Navbar/NavbarContainer';
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
import { withSuspense } from './HOC/withSuspense';

const Profile = React.lazy(() => import('./Components/Profile/Profile'));
const Dialogs = React.lazy(() => import('./Components/Dialogs/Dialogs'));

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
                        
                    <Route path='/profile' render={ () => { return <Suspense fallback={<Loader />}><Profile /></Suspense> } } />
                    
                    <Route path='/dialogs' render={ withSuspense(Dialogs) } />
    
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