
import React from 'react'
import UserProfile from './UserProfile';
import { connect } from 'react-redux';
import {
    setUser,
    profileFormDataSave,
    getUserStatus,
    updateUserStatus
} from '../../Redux/userProfileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class UserProfileContainer extends React.Component {

    componentDidMount() {
 
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 13527;
        }

        // It is  THUNK
        this.props.setUser(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return <UserProfile profile={this.props.profile} 
        isOwner={this.props.match.params.userId} 
        profileFormDataSave={this.props.profileFormDataSave} 
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus} />
    }
}

let mapStateToProps = (state) => ({
    profile: state.userProfilePage.profile,
    status: state.userProfilePage.status
})

export default compose(connect(mapStateToProps, {setUser, profileFormDataSave, getUserStatus, updateUserStatus}), withRouter) (UserProfileContainer);