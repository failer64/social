import {BaseThunkTypes, Types} from "./redux-store";
import {dialogsAPI, DialogsType, MessageType} from "../api/dialogs-api";
import {Enum} from "../api/api";


let initialState = {
        dialogs: [] as Array<DialogsType>,
        messages: [] as Array<MessageType>,
    }
;

export const dialogsReducer = (state = initialState,
                               action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "social/dialogs-reducer/ADD_DIALOGS":
            return {
                ...state,
                dialogs: action.dialogs
            }
        case 'social/dialogs-reducer/ADD_CHAT_MESSAGES':
            return {
                ...state,
                messages: action.messages
            }
        case 'social/dialogs-reducer/ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.message],
            }
        case 'social/dialogs-reducer/DELETE_MESSAGE':
            return {
                ...state,
                messages: state.messages.filter(item => item.id !== action.messageId)
            }
        default:
            return state;
    }
}

export const actions = {
    addNewMessage: (message: MessageType) => ({type: 'social/dialogs-reducer/ADD_MESSAGE', message} as const),
    addDialogs: (dialogs: Array<DialogsType>) => ({type: 'social/dialogs-reducer/ADD_DIALOGS', dialogs} as const),
    addChat: (messages: any) => ({type: 'social/dialogs-reducer/ADD_CHAT_MESSAGES', messages} as const),
    deleteMessageSuccess: (messageId: number) => ({type: 'social/dialogs-reducer/DELETE_MESSAGE', messageId} as const),
}

export const addMessage = (id: number, newMessage: any): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.sendMessage(id, newMessage);
    if (data.resultCode === Enum.Success) {
        dispatch(actions.addNewMessage(data.data.message));
    }
}

export const getDialogs = (): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.getAllDialogs();
    if (data) {
        dispatch(actions.addDialogs(data));
    }
}

export const getChat = (id: number): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.getChat(id);
    if (!data.error) {
        dispatch(actions.addChat(data.items));
    }
}

export const deleteMessage = (messageId: number): ThunkType => async (dispatch) => {
    const data = await dialogsAPI.deleteMessage(messageId);
    if (data.resultCode === Enum.Success) {
        dispatch(actions.deleteMessageSuccess(messageId));
    }
}

export const startChat = (userId: number): RedirectThunkType => async (dispatch) => {
    const data = await dialogsAPI.startChat(userId);
    if (data.resultCode === Enum.Success) {
    }
}

export default dialogsReducer;

type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<Types<typeof actions>>
type ThunkType = BaseThunkTypes<ActionsTypes>
type RedirectThunkType = BaseThunkTypes<ActionsTypes, any>