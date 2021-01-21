
import React, {useState} from 'react';

const UserProfileStatus = (props) => {


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
                <span onDoubleClick={activateEditMode} ><b>Hello</b></span>
            </div>
            }

            { editMode && 
            <div>
                <input onChange={ onStatusChange } autoFocus={true} onBlur={ deActivateEditMode } value={status} />
            </div>
            }
        </div>
    )
}
export default UserProfileStatus;