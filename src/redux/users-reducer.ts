import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";
import {Dispatch} from "redux";

const FOLLOW = "social/users-reducer/FOLLOW";
const UNFOLLOW = "social/users-reducer/UNFOLLOW";
const SET_USERS = "social/users-reducer/SET_USERS";
const SET_CURRENT_PAGE = "social/users-reducer/SET_CURRENT_PAGE";
const CHANGE_PAGE = "social/users-reducer/CHANGE_PAGE";
const TOGGLE_FETCHING = "social/users-reducer/TOGGLE_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "social/users-reducer/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 9,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //Array of users ids
};
type InitialStateType = typeof initialState
type ActionsTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetTotalUsersCountType
    | SetCurrentPageType | ToggleFetchingType | ToggleFollowingProgressType

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, totalUsersCount: action.count}
        case CHANGE_PAGE:
            return {...state, currentPage: action.page}
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        default:
            return state;
    }
}

type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({type: FOLLOW, userId})
type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({type: UNFOLLOW, userId})
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users})
type SetTotalUsersCountType = {
    type: typeof SET_CURRENT_PAGE
    count: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountType => ({type: SET_CURRENT_PAGE, count})
type SetCurrentPageType = {
    type: typeof CHANGE_PAGE
    page: number
}
export const setCurrentPage = (page: number): SetCurrentPageType => ({type: CHANGE_PAGE, page})
type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}
export const toggleFetching = (isFetching: boolean): ToggleFetchingType => ({type: TOGGLE_FETCHING, isFetching})
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId,
})

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsTypes>
export const getUsers = (currentPage: number,
                         pageSize: number): ThunkType => {
    return async (dispatch, getState: () => StateType) => {
        dispatch(toggleFetching(true));
        let data = await usersAPI.getUsers(pageSize, currentPage)
        dispatch(toggleFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                   actionCreator: (UserId: number) => FollowSuccessType | UnfollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.addFollow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), unfollowSuccess);
    }
}

export default usersReducer;