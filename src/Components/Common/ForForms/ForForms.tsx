

import React from 'react'
import f from './ForForms.module.css'
import { Field } from 'redux-form'
import { FieldValidatorRequired } from '../Validation/Validation'
import { WrappedFieldProps, WrappedFieldMetaProps } from '../../../../node_modules/@types/redux-form/lib/Field'


type FormControlPropsType = {
    meta: WrappedFieldMetaProps  // Добавляю уже изобретенную велосипед

    // children: React.ReactNode <=  Можно писать чилдрена и в то же время можно и не 
    // писать его. Потому что функционалные компоненты и так описывает чилдрена!
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;

    return (
        <div className={f.forForm + ' ' + ( hasError ? f.error : '' )}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}



export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;   Пробую убрать child, потому что ругается на него
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;   Пробую убрать child, потому что ругается на него
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}



export function createField<FormKeysType extends string>(     // Изменил стрелочную функцию в обычную функцию. Потому что в стрелочной 
    // функций Generic не работает! FormKeysType - это Generic. Где мы вызываем createField там же точно так же передаем
    // полученные ключи, в нашем случае это выглядить вот так: createField<LoginFormValuesTypeKeys>!
    name: FormKeysType, 
    placeholder: string | undefined, 
    component: React.FC<WrappedFieldProps>, 
    validate: Array<FieldValidatorRequired>, 
    props = {}, 
    text = '') {
    return <div>
        <Field  className={f.field} name={name} placeholder={placeholder} component={component} validate={validate} {...props} /> {text}  
    </div>
    }

