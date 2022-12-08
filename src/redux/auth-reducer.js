import {isAuthAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const ADD_ERROR = 'ADD_ERROR';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case ADD_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (email, id, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {email, id, login, isAuth}
})
export const addError = (error) => ({type: ADD_ERROR, error})

export const getAuthUserData = () => async (dispatch) => {
    let response = await isAuthAPI.me();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(response.data.email, response.data.id, response.data.login, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await isAuthAPI.login(email, password, rememberMe);
    if (response.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let message = response.messages.length ? response.messages[0] : 'Some error';
        dispatch(addError(message));
    }
}

export const logout = () => async (dispatch) => {
    let response = await isAuthAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;