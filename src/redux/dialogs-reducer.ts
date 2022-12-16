import {DialogsType, MessageType} from "../types/types";

const ADD_MESSAGE = "social/dialogs-reducer/ADD-MESSAGE";

let initialState = {
    dialogs: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Dmitry'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Dmitry'},
        {id: 5, name: 'Gena'},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'lorem'},
    ] as Array<MessageType>,
};
type InitialStateType = typeof initialState
type ActionsTypes = AddMessageActionCreatorType

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length + 1, message: action.message}],
            }
        default:
            return state;
    }
}

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    message: string
}
export const addMessageActionCreator = (message: string): AddMessageActionCreatorType => ({type: ADD_MESSAGE, message})

export default dialogsReducer;