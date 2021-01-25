
import React, {useState, useEffect} from 'react';
import uProf from './UserProfile.module.css';


const UserProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>

            { !editMode &&
            <div>
                <span onClick={ activateEditMode }><b>{props.status || 'status'}</b></span>
            </div>
            }

            { editMode && 
            <div>
                <input className={uProf.forStatus} onChange={ onStatusChange } autoFocus={true} onBlur={ deActivateEditMode } value={ status } />
            </div>
            }

            {/* { 
                editMode 
                ? <div><input onChange={ onStatusChange } autoFocus={true} onBlur={ deActivateEditMode } value={ status } /></div> 
                : <div><span onClick={ activateEditMode }><b>{status || "status"}</b></span></div> 
            }  */}

        </div>
    )
}

export default UserProfileStatus;
