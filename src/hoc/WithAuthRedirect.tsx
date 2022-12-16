import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {StateType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {}
type OwnPropsType = {}

let mapStateToPropsForRedirect = (state: StateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export const WithAuthRedirect = (Component: any) => {

    class RedirectComponent extends React.Component<MapStatePropsType> {
        render() {
            if (!(this.props.isAuth)) return <Navigate to={'/login'}/>

            return <Component {...this.props}/>
        }
    }

    const ConnectedAuthRedirectComponent =
        connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>(
            mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}