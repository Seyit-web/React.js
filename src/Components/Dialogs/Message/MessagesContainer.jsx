
import {addSend} from '../../../Redux/dialogsReducer';
import Messages from './Messages';
import {connect} from 'react-redux';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages
    }
}

export default compose( connect(mapStateToProps, { addSend }) ) (Messages);