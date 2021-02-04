
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import navbarReducer from './navbarReducer'
import usersReducer from './usersReducer'
import userProfileReducer from './userProfileReducer'
import authReducer from './authReducer'
import thunkMiddleware from 'redux-thunk'
import appReducer from './appReducer'
import { reducer as formReducer } from 'redux-form'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    userProfilePage: userProfileReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})


type RootReducerType = typeof rootReducer  // Из  rootReducer достаем тип, в нашем случае это  RootReducerType. Примерно 
// в этом коде будет -> "как будто мы создали GlobalStateType который нам надо и получить, и возвращает тот самый GlobalStateType". ПРИМЕРНО ТАК!
export type GlobalStateType = ReturnType<RootReducerType>  // Здесь получаем тот самый GlobalStateType. ReturnType сам определяет 
// тип возвращаемый из этого типа  RootReducerType и зафиксируется под именем GlobalStateType, и экпортируется! В нужное место импортируем и пользуемся.


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunkMiddleware) ))

// window.store = store
export default store