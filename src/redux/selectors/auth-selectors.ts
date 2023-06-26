import {StateType} from "../redux-store";

export const authUserIdSelector = (state: StateType) => {
    return state.auth.id;
}
export const isAuthSelector = (state: StateType) => {
    return state.auth.isAuth;
}
