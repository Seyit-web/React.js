
import React from 'react'
import { createField, Input, Textarea } from '../../Common/ForForms/ForForms'
import { reduxForm, InjectedFormProps } from 'redux-form'
import uProf from '../UserProfile.module.css'
import { ProfileType } from '../../../Types/types'


type PropsType = {
    profile: ProfileType
}

export type UserProfileSaveValuesTypeKeys  = Extract<keyof ProfileType, string> 

const UserProfileSave: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >
                { <div><button className={uProf.edit}>Save</button></div> }

                { props.error && <div className={uProf.someError}>{props.error}</div> }

            <div>
                <b>Full name</b>: { createField<UserProfileSaveValuesTypeKeys>('fullName', 'Full name', Input, []) }
            </div>
            <div>
                <b>Looking for a job</b>: { createField<UserProfileSaveValuesTypeKeys>('lookingForAJob', 'null', Input, [], {type: 'checkbox'}) }
            </div>
            <div>
                <b>My skills</b>: { createField<UserProfileSaveValuesTypeKeys>('lookingForAJobDescription', 'My skills', Textarea, []) }
            </div>
            <div>
                <b>About me</b>: { createField<UserProfileSaveValuesTypeKeys>('aboutMe', 'About me', Textarea, []) }
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

export const UserProfileReduxFormSave = reduxForm<ProfileType, PropsType>({ form: 'editUserProfile' }) (UserProfileSave)
