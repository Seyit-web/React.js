
import f from './ForForms.module.css';
import { Field } from 'redux-form';

export const Input = ({ input, meta: {touched, error}, ...props }) => {

    const showError = touched && error;

    return (
        <div className={f.forForm + ' ' + ( showError ? f.error : '' )}>
            <input {...props} {...input} />
            { showError && <span>{error}</span> }
        </div>
    )
}


export const createField = (name, placeholder, component, validate, props = {}, text = '') => (
    <div>
        <Field  className={f.field} name={name} placeholder={placeholder} component={component} validate={validate} {...props} /> {text}  
    </div>
)