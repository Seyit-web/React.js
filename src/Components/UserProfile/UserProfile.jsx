
import React from 'react'
import Loader from '../Common/Loader/Loader';
import uProf from './UserProfile.module.css'

const UserProfile = (props) => {

    if (!props.profile) {
        return <Loader />
    }
    
    return (
        <div className={uProf.userProfile}>
            <div className={uProf.userPhoto}>
                <img src={props.profile.photos.large} alt=""/>
            </div>
            <div className={uProf.descr}>
                <p>{props.profile.aboutMe}</p>
                <p>{props.profile.contacts.facebook}</p>
                <p>{props.profile.contacts.website}</p>
                <p>{props.profile.contacts.vk}</p>
                <p>{props.profile.contacts.twitter}</p>
                <p>{props.profile.contacts.instagram}</p>
                <p>{props.profile.contacts.youtube}</p>
                <p>{props.profile.contacts.github}</p>
                <p>{props.profile.contacts.mainLink}</p>
                <p>{props.profile.lookingForAJob}</p>
                <p>{props.profile.lookingForAJobDescription}</p>
                <p>{props.profile.fullName}</p>
            </div>
        </div>
    )
}

export default UserProfile;
