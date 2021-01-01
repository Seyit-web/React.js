
import React from 'react';
import m from './MyPosts.module.css';
import { Field, reduxForm } from 'redux-form'

const MyPostsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={m.addPost}>
            <Field className={m.forText} placeholder='Type a post' name="newPostText" component='textarea' />
            <button className={m.btn}>Add post</button>
        </form>
    )
}

export const MyPostsReduxForm = reduxForm({ form: 'addPostForm' }) (MyPostsForm)