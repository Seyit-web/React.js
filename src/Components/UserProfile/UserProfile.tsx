
import React, {useState, ChangeEvent} from 'react'
import Loader from '../Common/Loader/Loader'
import uProf from './UserProfile.module.css'
import bg from '../Profile/Ava/img/ava.jpg'
import { UserProfileReduxFormEdit } from './UserProfileEdit/UserProfileEdit'
import { UserProfileReduxFormSave } from './UserProfileSave/UserProfileSave'
import UserProfileStatus from './UserProfileStatus'
import { ProfileType } from '../../Types/types'



type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string

    updateUserStatus: (status: string) => void
    profileFormDataSave: (profile: ProfileType) => Promise<any> // Помни для будушего 
    // если возвращается промис тоесть then то пишем Promise<any>. Этот вариант не хорош
    // потому что мы диспатчим и ждем с помощю then. В будушем не забудь пофиксить!
    saveUserPhoto: (file: File) => void
}

const UserProfile: React.FC<PropsType> = (props) => {

    let [ editMode, setEditMode ] = useState(false)

    if (!props.profile) {
        return <Loader />
    }

    const onSubmit = (formData: ProfileType) => {
        props.profileFormDataSave(formData).then(() => {
            setEditMode(false)
        })
    }

    const choiceUserPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {  // Знак ? можно не ставить но при этом нам придется 
            // писать вот такой код: if (e.target.files.length && e.target.files) .
            props.saveUserPhoto(e.target.files[0])
        }
    }
    
    return (
        <div className={uProf.userProfile}>
            <div className={uProf.userPhoto}>
                <img src={props.profile.photos.large || bg} alt=""/>
                <div>
                    { props.isOwner && <input className={uProf.forPhoto} type={'file'} onChange={ choiceUserPhoto } /> }
                </div>
                <div>
                    <UserProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
                </div>
            </div>

            { editMode 
            ? <UserProfileReduxFormSave profile={props.profile} onSubmit={onSubmit} initialValues={props.profile} /> 
            : <UserProfileReduxFormEdit profile={props.profile} isOwner={props.isOwner} activedEditMode={ () => {setEditMode(true)} } /> 
            }

        </div>
    )
}

export default UserProfile
