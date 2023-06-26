import {Enum, EnumCaptcha, instance, ResponseType} from "./api";

type MeType = {
    id: number
    email: string
    login: string
}
type LoginType = {
    userId: number
}

export const isAuthAPI = {
    me() {
        return instance.get<ResponseType<MeType>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<ResponseType<LoginType, Enum | EnumCaptcha>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`).then(response => response.data);
    },
}