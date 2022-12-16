import Header from "./Header";
import React from "react";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (<Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>)
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>(
    mapStateToProps,
    {logout}
)(HeaderContainer);