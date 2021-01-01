
import {addSend, updateNewSendMessage} from '../../../Redux/dialogsReducer';
import Messages from './Messages';
import {connect} from 'react-redux';
import { withRedirectComponent } from '../../../HOC/withRedirectComponent';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        newSendResult: state.dialogsPage.newSendResult,
    }
}

export default compose( connect(mapStateToProps, { addSend, updateNewSendMessage }), withRedirectComponent ) (Messages);