import axios from "axios";
import {InfoType, PhotosType, ProfileType, UserType} from "../types/types";

export enum Enum {
    Success = 0,
    Error = 1
}
export enum EnumCaptcha {
    Captcha = 10,
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "82cc5ad0-702d-42bc-ba4e-a0eff182d3a2"
    }
});

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
type FollowType = {
    data: {}
    resultCode: Enum
    messages: Array<string>
}

export const usersAPI = {
    getUsers(pageSize: number = 5, currentPage: number = 1) {
        return (
            instance.get<GetUsersType>(`users?count=${pageSize}&page=${currentPage}`)
                .then(response => response.data)
        )
    },
    deleteFollow(id: number) {
        return (instance.delete<FollowType>(`follow/${id}`).then(response => response.data))
    },
    addFollow(id: number) {
        return (instance.post<FollowType>(`follow/${id}`).then(response => response.data))
    },
}


type UpdateStatusType = {
    resultCode: Enum
    messages: Array<string>
    data: {}
}
type UploadProfileType = {
    resultCode: Enum
    messages: Array<string>
    data: {}
}
type UpdatePhotoType = {
    resultCode: Enum
    messages: Array<string>
    data: PhotosType
}

export const profileAPI = {
    getProfile(id: number) {
        return instance.get<ProfileType>(`profile/${id}`).then(response => response.data)
    },
    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusType>(`profile/status`, {status: status});
    },
    updatePhoto(photos: any) {
        const formData = new FormData();
        formData.append("image", photos);
        return instance.put<UpdatePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    uploadProfile(profile: InfoType) {
        return instance.put<UploadProfileType>(`profile/`, profile).then(response => response.data);
    },
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: Enum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: Enum | EnumCaptcha
    messages: Array<string>
}
type logoutResponseType = {
    data: {}
    resultCode: Enum
    messages: Array<string>
}
export const isAuthAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<logoutResponseType>(`auth/login`).then(response => response.data);
    },
}

type getCaptchaUrlType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`).then(response => response.data);
    }
}


