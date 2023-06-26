import {StateType} from "../redux-store";

export const getMessagesSelector = (state: StateType) => {
    return state.dialogsPage.messages
}

export const getDialogsSelector = (state: StateType) => {
    return state.dialogsPage.dialogs
}