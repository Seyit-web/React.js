
import React from 'react'
import uProf from '../UserProfile.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Contact } from '../UserProfileContact/Contact'
import { ContactType, ProfileType } from '../../../Types/types'


type PropsType = {
    isOwner: boolean
    profile: ProfileType

    activedEditMode: () => void
}

const UserProfileEdit: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {

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
                <b>Contacts</b>: { 
                Object
                    .keys(props.profile.contacts)
                    .map((key) => {
                            return <Contact contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactType]} key={key} /> // Здесь мы
                            // говорим воспринимай как ключи из ContactType
                    }   )
                }
            </div>
        </form>
    )
}

export const UserProfileReduxFormEdit = reduxForm<ProfileType, PropsType>({ form: 'editUserProfile' }) (UserProfileEdit)
