
import React, {useState, useEffect, FC} from 'react'
import uProf from './UserProfile.module.css'



type PropsType = {
    status: string

    updateUserStatus: (status: string) => void
}


const UserProfileStatus: FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)
    
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

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>

            { !editMode &&
            <div>
                <span className={uProf.status} onClick={ activateEditMode }><b>{props.status || 'status'}</b></span>
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

export default UserProfileStatus
