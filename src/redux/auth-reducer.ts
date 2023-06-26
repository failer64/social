import {Enum, EnumCaptcha,} from "../api/api";
import {BaseThunkTypes, Types} from "./redux-store";
import {securityAPI} from "../api/security-api";
import {isAuthAPI} from "../api/auth-api";


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    error: null as string | null,
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "social/auth-reducer/SET_USER_DATA":
        case "social/auth-reducer/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload,
            }
        case "social/auth-reducer/ADD_ERROR":
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (email: string | null, id: number | null, login: string | null, isAuth: boolean) => ({
        type: 'social/auth-reducer/SET_USER_DATA',
        payload: {email, id, login, isAuth}
    } as const),
    addError: (error: string | null) => ({type: 'social/auth-reducer/ADD_ERROR', error} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'social/auth-reducer/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await isAuthAPI.me();
    if (data.resultCode === Enum.Success) {
        dispatch(actions.setAuthUserData(data.data.email, data.data.id, data.data.login, true));
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
            dispatch(actions.addError(message));
        }
    }

export const logout = (navigate: any): ThunkType => async (dispatch) => {
    const response = await isAuthAPI.logout();
    if (response.resultCode === Enum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
        navigate(`/login`);
    }
}

const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(actions.getCaptchaUrlSuccess(data.url));
}

export default authReducer;

type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<Types<typeof actions>>
type ThunkType = BaseThunkTypes<ActionsTypes>