
import React from 'react';
import { createField, Input, Textarea } from '../../Common/ForForms/ForForms';
import { reduxForm } from 'redux-form';
import { Contact } from '../UserProfileContact/Contact';

// export const createField = (name, placeholder, component, validate, props = {}, text = '') => (
//     <div>
//         <Field  className={f.field} name={name} placeholder={placeholder} component={component} validate={validate} {...props} /> {text}  
//     </div>
// )

const UserProfileSave = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >
                { <div><button>Save</button></div> }
            <div>
                <b>Full name</b>: { createField('fullName', 'Full name', Input, []) }
            </div>
            <div>
                <b>Looking for a job</b>: { createField('lookingForAJob', 'null', Input, [], {type: 'checkbox'}) }
            </div>
            <div>
                <b>My skills</b>: { createField('lookingForAJobDescription', 'My skills', Textarea, []) }
            </div>
            <div>
                <b>About me</b>: { createField('aboutMe', 'About me', Textarea, []) }
            </div>
            <div>
                <b>Contacts</b>: { Object.keys(props.profile.contacts).map(key => {
                    return <Contact contactTitle={key} contactValue={props.profile.contacts[key]} key={key} />
                }) }
            </div>
        </form>
        )
}

export const UserProfileReduxFormSave = reduxForm({ form: 'editUserProfile' }) (UserProfileSave)