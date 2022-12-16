export type PostsType = {
    id: number
    image: string
    postMessage: string
    likesCount: number
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null,
    followed: boolean
}

export type DialogsType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

export type InfoType = {
    userId: boolean
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
}