
import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logOut } from '../../Redux/authReducer'
import { compose } from 'redux'
import { GlobalStateType } from '../../Redux/reduxStore'


type PropsType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
}

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: GlobalStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default compose(connect(mapStateToProps, {logOut})) (HeaderContainer)
