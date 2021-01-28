
import React from 'react';
import { createField, Input, Textarea } from '../../Common/ForForms/ForForms';
import { reduxForm } from 'redux-form';
import uProf from '../UserProfile.module.css';


const UserProfileSave = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >
                { <div><button className={uProf.edit}>Save</button></div> }

                { props.error && <div className={uProf.someError}>{props.error}</div> }

            <div>
                <b>Full name</b>: { createField('fullName', 'Full name', Input, []) }
            </div>
            <div>
                <b>Looking for a job</b>: { createField('lookingForAJob', 'null', Input, [], {type: 'checkbox'}) }
            </div>
            <div>
                <b>My skills</b>: { createField('lookingForAJobDescription', 'My skills', Textarea, []) }
            </div>
            <div>
                <b>About me</b>: { createField('aboutMe', 'About me', Textarea, []) }
            </div>
            <div>
                <b>Contacts</b>: { Object.keys(props.profile.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}: { createField('contacts.' + key, key, Input, []) }</b> 
                    </div>
                }) }
            </div>
        </form>
    )
}

export const UserProfileReduxFormSave = reduxForm({ form: 'editUserProfile' }) (UserProfileSave)