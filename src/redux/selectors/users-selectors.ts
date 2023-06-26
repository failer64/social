import {createSelector} from "reselect";
import {StateType} from "../redux-store";

export const getUsersSelector = (state: StateType) => {
    return state.usersPage.users;
}

export const getUsersSuperSelector = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u => true);
    });

export const pageSizeSelector = (state: StateType) => {
    return state.usersPage.pageSize;
}

export const totalUsersCountSelector = (state: StateType) => {
    return state.usersPage.totalUsersCount;
}

export const currentPageSelector = (state: StateType) => {
    return state.usersPage.currentPage;
}

export const isFetchingSelector = (state: StateType) => {
    return state.usersPage.isFetching;
}

export const followingInProgressSelector = (state: StateType) => {
    return state.usersPage.followingInProgress;
}

export const filterSelector = (state: StateType) => {
    return state.usersPage.filter;
}