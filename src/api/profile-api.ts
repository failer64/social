import {InfoType, PhotosType, ProfileType} from "../types/types";
import {instance, ResponseType} from "./api";

type PhotoType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(id: number) {
        return instance.get<ProfileType>(`profile/${id}`).then(response => response.data)
    },
    getStatus(id: number) {
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status});
    },
    updatePhoto(photos: File) {
        const formData = new FormData();
        formData.append("image", photos);
        return instance.put<ResponseType<PhotoType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    uploadProfile(profile: InfoType) {
        return instance.put<ResponseType>(`profile/`, profile).then(response => response.data);
    },
}