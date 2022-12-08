import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "82cc5ad0-702d-42bc-ba4e-a0eff182d3a2"
    }
});

export const usersAPI = {
    getUsers(pageSize = 5, currentPage = 1) {
        return (
            instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data)
        )
    },
    deleteFollow(id) {
        return (instance.delete(`follow/${id}`).then(response => response.data))
    },
    addFollow(id) {
        return (instance.post(`follow/${id}`).then(response => response.data))
    },
    getProfile(id) {
        console.warn('Use "profileAPI.getProfile()"');
        return (
            profileAPI.getProfile(id)
        );
    },
}

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },
}

export const isAuthAPI = {
    me() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email, password, rememberMe) {
        return instance.post(`auth/login`, {email, password, rememberMe}).then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    },
}

export const  securityAPI = {
    captcha(){
        return instance.get(`security/get-captcha-url`).then(response => response.data);
    }
}


