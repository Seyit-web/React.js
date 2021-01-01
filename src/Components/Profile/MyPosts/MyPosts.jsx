
import React from 'react';
import m from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

    let postsElement = props.posts.map( p => <Post message={p.post} key={p.id} /> );

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {        
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    // let redirectComponent = (props) => {
    //     if (!props.isAuth) return <Redirect to='/login' />; 
    //     return <MyPostsContainer {...props} />
    // }

    return (
        <div className={m.myPosts}>
            <div className={m.addPost}>
                <textarea className={m.forText} onChange={onPostChange} placeholder='Type a post' name="text" ref={newPostElement} value={props.newPostText} />
                <button className={m.btn} onClick={ onAddPost }>Add post</button>
            </div>

            { postsElement }
        </div>
    );
}
export default MyPosts;