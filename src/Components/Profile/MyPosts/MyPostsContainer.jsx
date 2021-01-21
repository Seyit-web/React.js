
import {addPost} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { withRedirectComponent } from '../../../HOC/withRedirectComponent';


let mapStateToProps = (state) => {
    return{
        posts: state.profilePage.posts,
    }
}

export default compose( connect(mapStateToProps, { addPost }), withRedirectComponent ) (MyPosts);