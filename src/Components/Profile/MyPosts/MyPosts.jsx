
import React from 'react';
import m from './MyPosts.module.css';
import Post from './Post/Post';
import { MyPostsReduxForm } from './MyPostsForm';

const MyPosts = (props) => {

    let postsElement = props.posts.map( p => <Post message={p.post} key={p.id} /> );

    let addNewPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={m.myPosts}>
            <MyPostsReduxForm onSubmit={addNewPost} />
            { postsElement }
        </div>
    );
}

export default MyPosts;