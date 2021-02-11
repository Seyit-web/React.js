
import { actions } from '../../Redux/navbarReducer'
import Navbar from './Navbar'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { GlobalStateType } from '../../Redux/reduxStore'

let mapStateToProps = (state: GlobalStateType) => { 
    return {
        friendsContent: state.navbarPage.friendsContent
    }
}

export default compose(connect(mapStateToProps, { ...actions })) (Navbar)
