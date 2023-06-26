import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import appReducer from "./app-reducer";

let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

type RootReducerType = typeof RootReducer
export type StateType = ReturnType<RootReducerType>

// type PropsTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropsTypes<T>>
export type Types<T> = T extends { [key: string]: infer U } ? U : never
export type BaseThunkTypes<A extends Action, P = Promise<void>> = ThunkAction<P, StateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;