import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {
            id: 1,
            image: 'https://shapka-youtube.ru/wp-content/uploads/2020/08/man-silhouette.jpg',
            postMessage: 'It\'s ms first post!',
            likesCount: '2',
        },
        {
            id: 2,
            image: 'https://uprostim.com/wp-content/uploads/2021/03/image086-77.jpg',
            postMessage: 'Hey bro, how are you?',
            likesCount: '5',
        },
    ],
    userProfile: null,
    userStatus: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, image: '', postMessage: action.message, likesCount: '0'}],
            }
        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile,}
        case SET_STATUS:
            return {...state, userStatus: action.status,}
        default:
            return state;
    }
}

export const addPost = (message) => ({type: ADD_POST, message})
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getUserProfile = (userId) => async (dispatch) => {
    if (userId) {
        let response = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(response));
    }
}

export const getStatus = (userId) => async (dispatch) => {
    if (userId) {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response));
    }
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export default profileReducer;