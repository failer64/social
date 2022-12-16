import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, uploadPhoto, uploadProfile} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import {compose} from "redux";


const ProfileContainer = ({
                              userProfile, userStatus, authUserId, error,
                              getUserProfile, getStatus, updateStatus, uploadPhoto, uploadProfile
                          }) => {
    let params = useParams();

    useEffect(() => {
        if (!params.userId) {
            params.userId = authUserId;
        }
        getUserProfile(params.userId);
        getStatus(params.userId);
    }, [userProfile, userStatus, error]);

    if (!params.userId) return <Navigate to={'/login'}/>;
    return (<Profile uploadPhoto={uploadPhoto} userProfile={userProfile} userStatus={userStatus}
                     authUserId={authUserId} updateStatus={updateStatus}
                     uploadProfile={uploadProfile} error={error}
    />)
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        userStatus: state.profilePage.userStatus,
        authUserId: state.auth.id,
        error: state.profilePage.error,
    }
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, uploadPhoto, uploadProfile}),
    //WithAuthRedirect,
)(ProfileContainer);