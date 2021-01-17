
import React from 'react';
import d from './Dialogs.module.css';
import UnderDialog from './UnderDialog/UnderDialog';
import MessagesContainer from './Message/MessagesContainer';

const Dialogs = (props) => {
    

    return (
        <div className={d.mainDialogs}>
            <UnderDialog />
            <MessagesContainer />
        </div>
    )
}

export default Dialogs;