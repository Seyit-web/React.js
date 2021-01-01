
import React from 'react';
import d from './UnderDialog.module.css';
import DialogItem from './DialogItem/DialogItem';

const UnderDialog = (props) => {
    
    let state = props.store.getState();

    let dialogsElement = state.dialogsPage.dialogs.map( d =>  <DialogItem name={d.name} id={d.id} key={d.id} /> );
   
    return (
        <div className={d.dialog}>
            <div className={d.dIntro}>
                { dialogsElement }
            </div>
        </div>
    )
}

export default UnderDialog;