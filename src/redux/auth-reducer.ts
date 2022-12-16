import {Enum, EnumCaptcha, isAuthAPI, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

const SET_USER_DATA = "social/auth-reducer/SET_USER_DATA";
const ADD_ERROR = 'social/auth-reducer/ADD_ERROR';
const GET_CAPTCHA_URL_SUCCESS = 'social/auth-reducer/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    error: null as string | null,
};
type InitialStateType = typeof initialState
type ActionsTypes = SetAuthUserDataType | AddErrorType | GetCaptchaUrlSuccessType

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadType
}
type SetAuthUserDataPayloadType = {
    email: string | null
    id: number | null
    login: string | null
    isAuth: boolean
}
export const setAuthUserData = (email: string | null, id: number | null,
                                login: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: {email, id, login, isAuth}
})

type AddErrorType = {
    type: typeof ADD_ERROR
    error: string | null
}
const addError = (error: string | null): AddErrorType => ({type: ADD_ERROR, error})

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: GetCaptchaUrlSuccessPayloadType
}
type GetCaptchaUrlSuccessPayloadType = {
    captchaUrl: string | null
}
const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsTypes>
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await isAuthAPI.me();
    if (data.resultCode === Enum.Success) {
        dispatch(setAuthUserData(data.data.email, data.data.id, data.data.login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch) => {
        let data = await isAuthAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === Enum.Success) {
            await dispatch(getAuthUserData());
        } else {
            if (data.resultCode === EnumCaptcha.Captcha) {
                await dispatch(getCaptchaUrl());
            }
            let message = data.messages.length ? data.messages[0] : 'Some error';
            dispatch(addError(message));
        }
    }

export const logout = (): ThunkType => async (dispatch) => {
    let response = await isAuthAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccess(data.url));
}

export default authReducer;