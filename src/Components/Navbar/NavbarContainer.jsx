
import {addFriend, updateNewSearchFriend} from '../../Redux/navbarReducer';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import { compose } from 'redux';

let mapStateToProps = (state) => { 
    return {
        friendsContent: state.navbarPage.friendsContent,
        newSearchResult: state.navbarPage.newSearchResult
    }
}

export default compose(connect(mapStateToProps, { addFriend, updateNewSearchFriend })) (Navbar);