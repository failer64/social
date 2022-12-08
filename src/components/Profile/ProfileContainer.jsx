import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import {compose} from "redux";

const ProfileContainer = (props) => {

    let {userId} = useParams();

    useEffect(() => {
        if (!userId) {
            userId = props.authUserId;
            if (!userId) {
                //return <Navigate to={'/login'}/>
                userId = 2;
                //this.props.router.navigate('/login');
            }
        }
        props.getUserProfile(userId);
        props.getStatus(userId);
    }, []);
    return (<Profile {...props}/>)
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        userStatus: state.profilePage.userStatus,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.id,
    }
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    //WithAuthRedirect,
)(ProfileContainer);