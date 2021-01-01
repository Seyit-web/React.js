
import React from 'react';
import {connect} from 'react-redux';
import { follow, unfollow, getUsers, getUsers2 } from '../../Redux/usersReducer';
import Users from './Users';
import { compose } from 'redux';

class UsersContainer extends React.Component {

    componentDidMount() {
        // It is  THUNK
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        // It is  THUNK
        this.props.getUsers2(pageNumber, this.props.pageSize);
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

let mapStateToProps = (state) => { 
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        btnFollow: state.usersPage.btnFollow
    }
}

export default compose( connect(mapStateToProps, { follow, unfollow, getUsers, getUsers2 }) ) (UsersContainer);