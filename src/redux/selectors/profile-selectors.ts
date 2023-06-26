import {StateType} from "../redux-store";

export const getUserProfileSelector = (state: StateType) => {
    return state.profilePage.userProfile;
}

export const userStatusSelector = (state: StateType) => {
    return state.profilePage.userStatus;
}

export const profileErrorsSelector = (state: StateType) => {
    return state.profilePage.error;
}
export const profileIsFollowSelector = (state: StateType) => {
    return state.profilePage.isFollow;
}
export const getProfilePostsSelector = (state: StateType) => {
    return state.profilePage.posts
}