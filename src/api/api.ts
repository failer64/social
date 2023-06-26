import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "82cc5ad0-702d-42bc-ba4e-a0eff182d3a2"
    }
});

export enum Enum {
    Success = 0,
    Error = 1
}
export enum EnumCaptcha {
    Captcha = 10,
}

export type ResponseType<D = {}, RC = Enum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}