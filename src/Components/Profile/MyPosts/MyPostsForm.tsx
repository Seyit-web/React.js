
import React from 'react'
import m from './MyPosts.module.css'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Textarea } from '../../Common/ForForms/ForForms'
import { required } from '../../Common/Validation/Validation'
import { MyPostFormType } from './MyPosts'
import { Button } from 'antd'


type PropsType = {}

type MyPostFormTypeKeys = Extract<keyof MyPostFormType, string>


const MyPostsForm: React.FC<InjectedFormProps<MyPostFormType, PropsType> & PropsType>  = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={m.addPost}>

            { createField<MyPostFormTypeKeys>('newPostText', 'Type a post', Textarea, [required]) }
            
            <Button className={m.btn}>Add post</Button>
        </form>
    )
}

export const MyPostsReduxForm = reduxForm<MyPostFormType, PropsType>({ form: 'addPostForm' }) (MyPostsForm)