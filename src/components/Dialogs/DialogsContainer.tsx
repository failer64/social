import {addMessageActionCreator} from '../../redux/dialogs-reducer'
import {connect} from 'react-redux';
import Dialogs from './Dialogs'
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {StateType} from "../../redux/redux-store";
import {DialogsType, MessageType} from "../../types/types";


type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
}

type MapDispatchPropsType = {
    addMessage: (message: string) => void
}
type OwnPropsType = {

}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (message: string) => {
            dispatch(addMessageActionCreator(message));
        },
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>(
        mapStateToProps,
        mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);
