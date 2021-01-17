
import React, {useState} from 'react';
import p from './Profile.module.css';

const ProfileStatus = (props) => {


    let [ editMode, setEditMode ] = useState(false);
    let [ status, setStatus ] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            { !editMode &&
            <div>
                <span onDoubleClick={activateEditMode} >Hello</span>
            </div>
            }

            { editMode && 
            <div>
                <input onChange={ onStatusChange } autoFocus={true} onBlur={ deActivateEditMode } className={p.field} value={status} />
            </div>
            }
        </div>
    )
}
export default ProfileStatus;