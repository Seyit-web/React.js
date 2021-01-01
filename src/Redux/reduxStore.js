
import { combineReducers, createStore, applyMiddleware } from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import navbarReducer from './navbarReducer';
import usersReducer from './usersReducer';
import userProfileReducer from './userProfileReducer';
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    userProfilePage: userProfileReducer,
    auth: authReducer
});

let store = createStore( reducers, applyMiddleware(thunkMiddleware) );

window.store = store;

export default store;