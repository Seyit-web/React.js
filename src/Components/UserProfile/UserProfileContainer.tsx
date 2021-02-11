
import React from 'react'
import UserProfile from './UserProfile'
import { connect } from 'react-redux'
import {
    setUser,
    profileFormDataSave,
    getUserStatus,
    updateUserStatus, 
    saveUserPhoto
} from '../../Redux/userProfileReducer'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { GlobalStateType } from '../../Redux/reduxStore'
import { ProfileType } from '../../Types/types'



type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: number
    match: any

    saveUserPhoto: (userPhoto: any) => void
    setUser: (userId: number) => void
    getUserStatus: (userId: number) => void
    profileFormDataSave: (formData: any) => void
    updateUserStatus: (status: string) => void
}

type StateType = {

}

class UserProfileContainer extends React.Component<PropsType, StateType> {

    refreshComponent() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 13527;
        }

        // It is  THUNK
        this.props.setUser(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshComponent();
    }
    
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshComponent();
        }
    }

    render() {
        return <UserProfile 
        profile={this.props.profile} 
        saveUserPhoto={this.props.saveUserPhoto} 
        isOwner={this.props.match.params.userId} 
        profileFormDataSave={this.props.profileFormDataSave} 
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus} />
    }
}

let mapStateToProps = (state: GlobalStateType) => ({
    profile: state.userProfilePage.profile,
    status: state.userProfilePage.status
})

export default compose<React.ComponentType>(connect(
    mapStateToProps, 
    {setUser, getUserStatus, profileFormDataSave, updateUserStatus, saveUserPhoto}
    ), withRouter) (UserProfileContainer) 
    // Если мы экспортируем без   as React.ComponentType  то  compose  не говорит именна что это такое. Поэтому приходится уточнять написав  as React.ComponentType!
