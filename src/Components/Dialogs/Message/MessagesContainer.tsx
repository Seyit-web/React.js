
import { actions } from '../../../Redux/dialogsReducer'
import Messages from './Messages'
import {connect} from 'react-redux'
import { compose } from 'redux'
// import { withRedirectComponent } from '../../../HOC/withRedirectComponent'
import { GlobalStateType } from '../../../Redux/reduxStore'


let mapStateToProps = (state: GlobalStateType) => {
    return {
        messages: state.dialogsPage.messages
    }
}

export default compose( connect(mapStateToProps, { ...actions }) ) (Messages)
