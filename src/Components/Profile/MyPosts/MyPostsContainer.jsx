
import {addPost} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import { withRedirectComponent } from '../../../HOC/withRedirectComponent';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return{
        posts: state.profilePage.posts,
    }
}

export default compose( connect(mapStateToProps, { addPost }), withRedirectComponent ) (MyPosts);