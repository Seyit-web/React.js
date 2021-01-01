
import React from 'react'
import UserProfile from './UserProfile';
import { connect } from 'react-redux';
import { setUser } from '../../Redux/userProfileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class UserProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.match.params.userId;
        // if (!userId) {
        //     userId = 2;
        // }
        
        // It is  THUNK
        this.props.setUser(userId);
    }

    render() {
        return <UserProfile profile={this.props.profile} />
    }
}

let mapStateToProps = (state) => ({
    profile: state.userProfilePage.profile
})

export default compose(connect(mapStateToProps, {setUser}), withRouter) (UserProfileContainer);