
import React from 'react';
import uProf from '../UserProfile.module.css';
import { reduxForm } from 'redux-form';
import { Contact } from '../UserProfileContact/Contact';


const UserProfileEdit = (props) => {

    return(
        <form>
                { props.isOwner && <div><button className={uProf.edit} onClick={props.activedEditMode}>Edit</button></div> }
            <div>
                <b>Full name</b>: {props.profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {props.profile.lookingForAJob && 
                <div>
                    <b>My skills</b>: {props.profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {props.profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: { Object.keys(props.profile.contacts).map(key => {
                    return <Contact contactTitle={key} contactValue={props.profile.contacts[key]} key={key} />
                }) }
            </div>
        </form>
    )
}

export const UserProfileReduxFormEdit = reduxForm({ form: 'editUserProfile' }) (UserProfileEdit)
