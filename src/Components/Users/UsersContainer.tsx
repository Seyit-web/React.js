
import React from 'react'
import {connect} from 'react-redux'
import { follow, unfollow, requestUsers, getUsers2 } from '../../Redux/usersReducer'
import Users from './Users'
import { compose } from 'redux'
import {
    getUsersCreateSelector,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getBtnFollow
} from '../../Selectors/Selectors'
import { UsersType } from '../../Types/types'
import { GlobalStateType } from '../../Redux/reduxStore'



type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean

    btnFollow: Array<number>
    users: Array<UsersType>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    getUsers2: (pageNumber: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType


class UsersContainer extends React.Component<PropsType> {    // <PropsType> <StateType>
    componentDidMount() {
        // It is  THUNK
        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        // It is  THUNK
        const {pageSize} = this.props;
        this.props.getUsers2(pageNumber, pageSize);
    }

    render() {
        return (
            <Users 
                onPageChanged={this.onPageChanged}

                unfollow={this.props.unfollow} 
                follow={this.props.follow} 

                users={this.props.users}
                pageSize={this.props.pageSize} 
                totalUsersCount={this.props.totalUsersCount} 
                currentPage={this.props.currentPage} 
                isFetching={this.props.isFetching}
                btnFollow={this.props.btnFollow}
            />            
        )   
    }
}

let mapStateToProps = (state: GlobalStateType): MapStatePropsType => { 
    return {
        users: getUsersCreateSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        btnFollow: getBtnFollow(state),
    }
}

// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default compose( connect(mapStateToProps, { follow, unfollow, requestUsers, getUsers2 }) ) (UsersContainer)