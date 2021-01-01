
import {addPost, updateNewPostText} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import { withRedirectComponent } from '../../../HOC/withRedirectComponent';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return{
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}


export default compose( connect(mapStateToProps, { addPost, updateNewPostText }), withRedirectComponent ) (MyPosts);