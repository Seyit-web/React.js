
import f from './ForForms.module.css';

export const Input = ({ input, meta, ...props }) => {

    const showError = meta.touched && meta.error;

    return (
        <div className={f.forForm + ' ' + ( showError ? f.error : '' )}>
            <input {...props} {...input} />
            { showError && <span>{meta.error}</span> }
        </div>
    )
}