
import { combineReducers, createStore, applyMiddleware, compose, Action } from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import navbarReducer from './navbarReducer'
import usersReducer from './usersReducer'
import userProfileReducer from './userProfileReducer'
import authReducer from './authReducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import appReducer from './appReducer'
import { reducer as formReducer } from 'redux-form'
import chatReducer from './chatReducer'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    userProfilePage: userProfileReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    chat: chatReducer
})


type RootReducerType = typeof rootReducer  // Из  rootReducer достаем тип, в нашем случае это  RootReducerType. Примерно 
// в этом коде будет -> "как будто мы создали GlobalStateType который нам надо и получить, и возвращает тот самый GlobalStateType". ПРИМЕРНО ТАК!
export type GlobalStateType = ReturnType<RootReducerType>  // Здесь получаем тот самый GlobalStateType. ReturnType сам определяет 
// тип возвращаемый из этого типа  RootReducerType и зафиксируется под именем GlobalStateType, и экпортируется! В нужное место импортируем и пользуемся.



// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never  // Здесь мы говорим если переданный 
    // в PropertiesTypes тип <T> является объектом у которого есть ключ которое является строка а значением этого ключа 
    // является что либо, определи мне его с помощю infer U и верни мне этот тип U. В противном случае верни 
    // мне never.
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>  // Здесь мы
    // берем тип из PropertiesTypes<T> и засовываем в InferActionsTypes<T>. Этот тип кода  <T extends {[key: string]: (...args: any[]) => any}> означает 
    // что мы передаем внутрь тип, который является объектом  который возаращает ФУНКЦИЮ: (...args: any[]) => any 
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never



export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, GlobalStateType, unknown, A> // Добавление и 
    // к изменению ниже. 
// type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>
    // Здесь мы импортируем ThunkAction из redux. Внутри приходит Параметрый. Первым идет Pomise<void> который означает возаращаемое значение
    // из нашего текущего акшена. Вторым идет GlobalStateType. Третим у нас unknown это "extraArgument" который тоже приходит
    // к текщему Санку. Четвертым идет ActionsTypes который у нас набор всех акшен крейтеров. 
    
    

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunkMiddleware) ))

// window.store = store
export default store