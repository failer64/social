import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {BaseThunkTypes, Types} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {isFollowed} from "./profile-reducer";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //Array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "social/users-reducer/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
            }
        case "social/users-reducer/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
            }
        case "social/users-reducer/SET_USERS":
            return {...state, users: action.users}
        case "social/users-reducer/SET_CURRENT_PAGE":
            return {...state, totalUsersCount: action.count}
        case "social/users-reducer/CHANGE_PAGE":
            return {...state, currentPage: action.page}
        case "social/users-reducer/TOGGLE_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "social/users-reducer/SET_FILTER":
            return {...state, filter: action.payload}
        case "social/users-reducer/TOGGLE_FOLLOWING_PROGRESS":
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

export const actions = {
    followSuccess: (userId: number) => ({type: 'social/users-reducer/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'social/users-reducer/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'social/users-reducer/SET_USERS', users} as const),
    setTotalUsersCount: (count: number) => ({type: 'social/users-reducer/SET_CURRENT_PAGE', count} as const),
    setCurrentPage: (page: number) => ({type: 'social/users-reducer/CHANGE_PAGE', page} as const),
    toggleFetching: (isFetching: boolean) => ({type: 'social/users-reducer/TOGGLE_FETCHING', isFetching} as const),
    setFiler: (filter: FilterType) => ({type: 'social/users-reducer/SET_FILTER', payload: filter} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'social/users-reducer/TOGGLE_FOLLOWING_PROGRESS',
        isFetching,
        userId,
    } as const)
}

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFetching(true));
        dispatch(actions.setFiler(filter));
        let data = await usersAPI.getUsers(pageSize, currentPage, filter.term, filter.friend)
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any,
                                   actionCreator: (UserId: number) => any) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.addFollow.bind(usersAPI), actions.followSuccess);
        dispatch(isFollowed(userId));
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), actions.unfollowSuccess);
        dispatch(isFollowed(userId));
    }
}

export default usersReducer;

type InitialStateType = typeof initialState

//type ActionsTypes = InferActionsTypes<typeof actions>
type ActionsTypes = ReturnType<Types<typeof actions>>

type ThunkType = BaseThunkTypes<ActionsTypes>

export type FilterType = {
    term: string
    friend: null | boolean
    page?: number
}