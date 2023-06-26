import {Enum} from "../api/api";
import {PostsType, ProfileType, PhotosType, InfoType} from "../types/types";
import {BaseThunkTypes, StateType, Types} from "./redux-store";
import {profileAPI} from "../api/profile-api";
import {usersAPI} from "../api/users-api";

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
    isFollow: false
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "social/profile-reducer/ADD_POST":
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length + 1,
                    image: '',
                    postMessage: action.message,
                    likesCount: 0
                }],
            }
        case "social/profile-reducer/SET_USER_PROFILE":
            return {...state, userProfile: action.userProfile,}
        case "social/profile-reducer/SET_STATUS":
            return {...state, userStatus: action.status,}
        case "social/profile-reducer/SAVE_PHOTO_SUCCESS":
            return {...state, userProfile: {...state.userProfile, photos: action.photos} as ProfileType}
        case "social/profile-reducer/ADD_ERROR":
            return {...state, error: action.error}
        case "social/profile-reducer/IS_FOLLOW":
            return {...state, isFollow: action.payload.result}
        default:
            return state;
    }
}

export const actions = {
    addPost: (message: string) => ({type: 'social/profile-reducer/ADD_POST', message} as const),
    setUserProfile: (userProfile: ProfileType) =>
        ({type: 'social/profile-reducer/SET_USER_PROFILE', userProfile} as const),
    setStatus: (status: string) => ({type: 'social/profile-reducer/SET_STATUS', status} as const),
    updatePhotoSuccess: (photos: PhotosType) => ({type: 'social/profile-reducer/SAVE_PHOTO_SUCCESS', photos} as const),
    addProfileFormError: (error: string | null) => ({type: 'social/profile-reducer/ADD_ERROR', error} as const),
    addFollow: (result: boolean) => ({type: 'social/profile-reducer/IS_FOLLOW', payload: {result}} as const),
}

export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    if (userId) {
        const data = await profileAPI.getProfile(userId);
        dispatch(actions.setUserProfile(data));
    }
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    if (userId) {
        const data = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(data));
    }
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === Enum.Success) {
        dispatch(actions.setStatus(status));
    }
}

export const uploadPhoto = (photos: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.updatePhoto(photos);
    if (data.resultCode === Enum.Success) {
        dispatch(actions.updatePhotoSuccess(data.data.photos));
    }
}

export const uploadProfile = (info: InfoType): ThunkType =>
    async (dispatch, getState: GetStateType) => {
        const userId = getState().auth.id;
        const data = await profileAPI.uploadProfile(info);
        if (data.resultCode === Enum.Success) {
            dispatch(actions.addProfileFormError(null));
            dispatch(getUserProfile(userId));
        } else {
            const message = data.messages.length ? data.messages[0] : 'Some error';
            dispatch(actions.addProfileFormError(message));
            return Promise.reject(message);
        }
    }

export const isFollowed = (userId: number): ThunkType => async (dispatch) => {
    const data = await usersAPI.isFollow(userId);
    if (data.status === 200) {
        dispatch(actions.addFollow(data.data));
    }
}

export default profileReducer;

type InitialStateType = typeof initialState
type ActionsType = ReturnType<Types<typeof actions>>
type GetStateType = () => StateType
type ThunkType = BaseThunkTypes<ActionsType>
