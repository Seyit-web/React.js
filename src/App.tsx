
import React, { Suspense } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { initializeApp } from './Redux/appReducer'
// import { withSuspense } from './HOC/withSuspense'
import { Redirect } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Loader from './Components/Common/Loader/Loader'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import NavbarContainer from './Components/Navbar/NavbarContainer'
import { UsersPage } from './Components/Users/UsersPage'
import UserProfileContainer from './Components/UserProfile/UserProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import Dialogs from './Components/Dialogs/Dialogs'
import { Login } from './Components/Login/Login'
import { GlobalStateType } from './Redux/reduxStore'

const Profile = React.lazy(() => import('./Components/Profile/Profile'))
// const Dialogs = React.lazy(() => import('./Components/Dialogs/Dialogs'))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

    // catchAllUnhandledErrors = (promiseRejectionEvent) => {
    //     alert('Some error occured');
    //     // console.error(promiseRejectionEvent);
    // }

    componentDidMount() {
        // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);

        // It is a THUNK
        this.props.initializeApp();
    }
    
    // componentWillUnmount() {
    //     window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    // }
    
    render() {

        if (!this.props.initialized) {
            return <Loader />
        }

        return (
            <div className="main">
                <HeaderContainer />
                <div className="base">                
                    <NavbarContainer />
                        
                    <Switch>

                        <Route exact path='/' render={ () => { return <Redirect to={'/profile'} /> }  } />

                        <Route path='/profile' render={ () => { return <Suspense fallback={<Loader />}><Profile /></Suspense> } } />
                        
                        <Route path='/dialogs' render={ () => <Dialogs /> } />
        
                        <Route path='/users' render={ () => <UsersPage /> } />
        
                        <Route path='/userProfile/:userId?' render={ () => <UserProfileContainer /> } />
                        
                        <Route path='/login' render={ () => <Login /> } />

                        <Route path='*' render={ () => <PageNotFound /> } />
                    
                    </Switch>
                </div>
            </div>
      )
    }
}

const mapStateToProps = (state: GlobalStateType) => ({
    initialized: state.app.initialized
})

export default compose(connect(mapStateToProps, {initializeApp}), withRouter) (App) 
