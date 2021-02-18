
import React, { Suspense } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { initializeApp } from './Redux/appReducer'
import { Redirect } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Loader from './Components/Common/Loader/Loader'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import { UsersPage } from './Components/Users/UsersPage'
import UserProfileContainer from './Components/UserProfile/UserProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import Dialogs from './Components/Dialogs/Dialogs'
import { Login } from './Components/Login/Login'
import { GlobalStateType } from './Redux/reduxStore'

import { Layout } from 'antd'
import { ForMenu } from './Components/ForMenu/ForMenu'
const { Content } = Layout



const Profile = React.lazy(() => import('./Components/Profile/Profile'))
const ChatPage = React.lazy(() => import('./Components/Chat/ChatPage'))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }
    
    render() {

        if (!this.props.initialized) {
            return <Loader />
        }


        return (
            <Layout>
              
                <HeaderContainer />

                <Content style={{ padding: '0 50px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <div className="base"> 
                            <ForMenu />
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>

                                <Switch>

                                    <Route exact path='/' render={ () => { return <Redirect to={'/profile'} /> }  } />

                                    <Route path='/profile' render={ () => { return <Suspense fallback={<Loader />}><Profile /></Suspense> } } />
                                
                                    <Route path='/dialogs' render={ () => <Dialogs /> } />

                                    <Route path='/users' render={ () => <UsersPage /> } />

                                    <Route path='/chat' render={ () => { return <Suspense fallback={<Loader />}><ChatPage /></Suspense> } } />

                                    <Route path='/userProfile/:userId?' render={ () => <UserProfileContainer /> } />
                                
                                    <Route path='/login' render={ () => <Login /> } />

                                    <Route path='*' render={ () => <PageNotFound /> } />
                            
                                </Switch>
                                
                            </Content>
                        </div>
                    </Layout>
                </Content>
            </Layout>
      )
    }
}

const mapStateToProps = (state: GlobalStateType) => ({
    initialized: state.app.initialized
})

export default compose(connect(mapStateToProps, {initializeApp}), withRouter) (App) 
