
import React from 'react';
import d from './UnderDialog.module.css';
import DialogItem from './DialogItem/DialogItem';
import { connect } from 'react-redux';
import { compose } from 'redux';

const UnderDialog = (props) => {

    let dialogsElement = props.dialogs.map( d =>  <DialogItem name={d.name} id={d.id} key={d.id} /> );
   
    return (
        <div className={d.dialog}>
            <div className={d.dIntro}>
                { dialogsElement }
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs
    }
}

export default compose( connect(mapStateToProps, null) ) (UnderDialog);