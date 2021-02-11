
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { GlobalStateType } from '../Redux/reduxStore'



let mapStateToPropsForRedirect = (state: GlobalStateType) => ({
        isAuth: state.auth.isAuth
}as PropsType)

type PropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}

export function withRedirectComponent<WCP> ( WrappedComponent: React.ComponentType<WCP> ) {
    
    const RedirectComponent: React.FC<PropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to='/login' /> 

        return <WrappedComponent {...restProps as WCP} />
    }

    let ConnectedRedirectComponent = connect<PropsType, DispatchPropsType, WCP, GlobalStateType>(mapStateToPropsForRedirect, {}) (RedirectComponent)

    return ConnectedRedirectComponent
}
