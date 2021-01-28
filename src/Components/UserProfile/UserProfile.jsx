
import React, {useState} from 'react'
import Loader from '../Common/Loader/Loader';
import uProf from './UserProfile.module.css';
import bg from '../Profile/Ava/img/ava.jpg';
import { UserProfileReduxFormEdit } from './UserProfileEdit/UserProfileEdit';
import { UserProfileReduxFormSave } from './UserProfileSave/UserProfileSave';
import UserProfileStatus from './UserProfileStatus';


const UserProfile = (props) => {

    let [ editMode, setEditMode ] = useState(false);

    if (!props.profile) {
        return <Loader />
    }

    const onSubmit = (formData) => {
        props.profileFormDataSave(formData).then(() => {
            setEditMode(false);
        })
    }

    const choiceUserPhoto = (e) => {
        if (e.target.files.length) {
            props.saveUserPhoto(e.target.files[0]);
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

export default UserProfile;
