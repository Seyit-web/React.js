
import { actions } from '../../../Redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { withRedirectComponent } from '../../../HOC/withRedirectComponent'
import { GlobalStateType } from '../../../Redux/reduxStore'


let mapStateToProps = (state: GlobalStateType) => {
    return{
        posts: state.profilePage.posts
    }
}

export default compose<React.ComponentType>( connect(mapStateToProps, { ...actions }), withRedirectComponent ) (MyPosts)
