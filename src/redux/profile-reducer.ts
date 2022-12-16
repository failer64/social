import {Enum, profileAPI} from "../api/api";
import {PostsType, ProfileType, PhotosType, InfoType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

const ADD_POST = 'social/profile-reducer/ADD_POST';
const SET_USER_PROFILE = 'social/profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'social/profile-reducer/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'social/profile-reducer/UPDATE_PHOTO_SUCCESS';
const ADD_ERROR = 'social/profile-reducer/ADD_ERROR';

let initialState = {
    posts: [
        {
            id: 1,
            image: 'https://shapka-youtube.ru/wp-content/uploads/2020/08/man-silhouette.jpg',
            postMessage: 'It\'s ms first post!',
            likesCount: 2,
        },
        {
            id: 2,
            image: 'https://uprostim.com/wp-content/uploads/2021/03/image086-77.jpg',
            postMessage: 'Hey bro, how are you?',
            likesCount: 5,
        },
    ] as Array<PostsType>,
    userProfile: null as ProfileType | null,
    userStatus: '' as string,
    error: null as string | null,
}
type InitialStateType = typeof initialState
type ActionsType = AddPostType | SetUserProfileType | SetStatusType | UpdatePhotoSuccessType | addProfileFormErrorType


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length + 1,
                    image: '',
                    postMessage: action.message,
                    likesCount: 0
                }],
            }
        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile,}
        case SET_STATUS:
            return {...state, userStatus: action.status,}
        case SAVE_PHOTO_SUCCESS:
            return {...state, userProfile: {...state.userProfile, photos: action.photos} as ProfileType}
        case ADD_ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
}
type AddPostType = {
    type: typeof ADD_POST
    message: string
}
export const addPost = (message: string): AddPostType => ({type: ADD_POST, message})
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    userProfile: ProfileType
}
export const setUserProfile = (userProfile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, userProfile})
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})
type UpdatePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
const updatePhotoSuccess = (photos: PhotosType): UpdatePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})
type addProfileFormErrorType = {
    type: typeof ADD_ERROR
    error: string | null
}
const addProfileFormError = (error: string | null): addProfileFormErrorType => ({type: ADD_ERROR, error})

type GetStateType = () => StateType
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsType>


export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    if (userId) {
        const data = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
    }
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    if (userId) {
        const data = await profileAPI.getStatus(userId);
        dispatch(setStatus(data));
    }
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const uploadPhoto = (photos: PhotosType): ThunkType => async (dispatch) => {
    const data = await profileAPI.updatePhoto(photos);
    if (data.resultCode === 0) {
        dispatch(updatePhotoSuccess(data.data));
    }
}

export const uploadProfile = (info: InfoType): ThunkType =>
    async (dispatch, getState: GetStateType) => {
        const userId = getState().auth.id;
        const data = await profileAPI.uploadProfile(info);
        if (data.resultCode === Enum.Success) {
            dispatch(addProfileFormError(null));
            await dispatch(getUserProfile(userId));
        } else {
            const message = data.messages.length ? data.messages[0] : 'Some error';
            dispatch(addProfileFormError(message));
            return Promise.reject(message);
        }
    }

export default profileReducer;