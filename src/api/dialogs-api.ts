import {instance} from "./api";
import {PhotosType} from "../types/types";

export type DialogsType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
    userName: string
}

type SendMessageType = {
    data: { message: MessageType }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
export type MessageType = {
    addedAt: string
    body: string
    deletedByRecipient: boolean
    deletedBySender: boolean
    distributionId: null | number
    id: number
    isSpam: boolean
    recipientId: number
    recipientName: string
    senderId: number
    senderName: string
    translatedBody: null | string
    viewed: boolean
}

export const dialogsAPI = {
    startChat(id: number) {
        return instance.put(`dialogs/${id}`).then(response => response.data);
    },
    getAllDialogs() {
        return instance.get<Array<DialogsType>>(`dialogs`).then(response => response.data);
    },
    getChat(id: number) {
        return instance.get(`dialogs/${id}/messages`).then(response => response.data);
    },
    sendMessage(id: number, message: any) {
        return instance.post<SendMessageType>(`dialogs/${id}/messages`, {body: message.newMessage})
            .then(response => response.data);
    },
    isViewed(messageId: number) {
        return instance.get(`dialogs/messages/${messageId}/viewed`).then(response => response.data);
    },
    deleteMessage(messageId: number) {
        return instance.delete(`dialogs/messages/${messageId}`).then(response => response.data);
    }
}