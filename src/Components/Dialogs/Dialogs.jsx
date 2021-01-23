
import React from 'react';
import d from './Dialogs.module.css';
import MessagesContainer from './Message/MessagesContainer';

const Dialogs = (props) => {
    

    return (
        <div className={d.mainDialogs}>
            <MessagesContainer />
        </div>
    )
}

export default Dialogs;