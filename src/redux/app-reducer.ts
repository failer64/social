import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

const SET_INIT = "social/app-reducer/SET_INIT";

const initialState = {
    init: false,
}
type InitialStateType = typeof initialState
type ActionsTypes = SetInitType

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_INIT:
            return {
                ...state,
                init: true,
            }
        default:
            return state;
    }
}
type SetInitType = {
    type: typeof SET_INIT
}
export const setInit = (): SetInitType => ({type: SET_INIT})

type ThunkType = ThunkAction<void, StateType, unknown, ActionsTypes>
export const initApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(setInit());
    })
}

export default appReducer;