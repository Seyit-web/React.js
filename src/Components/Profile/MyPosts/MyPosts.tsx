
import React from 'react'
import m from './MyPosts.module.css'
import Post from './Post/Post'
import { MyPostsReduxForm } from './MyPostsForm'


type PostType = {
    id: number
    post: string
}

type PropsType = {
    posts: Array<PostType>
    addPost: (myPostText: string) => void
}

export type MyPostFormType = {
    newPostText: string
}



const MyPosts: React.FC<PropsType> = (props) => {

    let postsElement = props.posts.map( p => <Post message={p.post} key={p.id} /> );

    let addNewPost = (values: MyPostFormType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={m.myPosts}>
            <MyPostsReduxForm onSubmit={addNewPost} />
            { postsElement }
        </div>
    );
}

export default MyPosts
