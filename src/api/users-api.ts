import {instance, ResponseType} from "./api";
import {UserType} from "../types/types";

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(pageSize: number = 5, currentPage: number = 1, term: string = '', friend: null | boolean = null) {
        return (
            instance.get<GetUsersType>(`users?count=${pageSize}&page=${currentPage}&term=${term}` +
                (friend === null ? '' : `&friend=${friend}`))
                .then(response => response.data)
        )
    },
    deleteFollow(id: number) {
        return (instance.delete<ResponseType>(`follow/${id}`).then(response => response.data))
    },
    addFollow(id: number) {
        return (instance.post<ResponseType>(`follow/${id}`).then(response => response.data))
    },
    isFollow(id: number) {
        return (instance.get<any>(`follow/${id}`))
    },
}