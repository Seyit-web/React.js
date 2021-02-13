
import React from 'react'
import {connect} from 'react-redux'
import { follow, unfollow, requestUsers, FilterType } from '../../Redux/usersReducer'
import Users from './Users'
import { compose } from 'redux'
import {
    getUsersCreateSelector,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getBtnFollow,
    getUsersFilter
} from '../../Selectors/Selectors'
import { UsersType } from '../../Types/types'
import { GlobalStateType } from '../../Redux/reduxStore'



type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    filter: FilterType

    btnFollow: Array<number>
    users: Array<UsersType>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType


class UsersContainer extends React.Component<PropsType> {    // <PropsType> <StateType>
    componentDidMount() {
        // It is  THUNK
        const {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        // It is  THUNK
        const {pageSize, filter} = this.props;
        this.props.requestUsers(pageNumber, pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;

        this.props.requestUsers(1, pageSize, filter);
    }

    render() {
        return (
            <Users 
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}

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
        filter: getUsersFilter(state)
    }
}

// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default compose( connect(mapStateToProps, { follow, unfollow, requestUsers}) ) (UsersContainer)
