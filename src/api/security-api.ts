import {instance} from "./api";

type SecurityType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<SecurityType>(`security/get-captcha-url`).then(response => response.data);
    }
}