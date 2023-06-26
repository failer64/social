import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {StateType, Types} from "./redux-store";


const initialState = {
    init: false,
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'social/app-reducer/SET_INIT':
            return {
                ...state,
                init: true,
            }
        default:
            return state;
    }
}

export const actions = {
    setInit: () => ({type: 'social/app-reducer/SET_INIT'} as const)
}

type ThunkType = ThunkAction<void, StateType, unknown, ActionsTypes>
export const initApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.setInit());
    })
}

export default appReducer;

type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<Types<typeof actions>>