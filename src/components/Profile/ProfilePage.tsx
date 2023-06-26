import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {Navigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, getUserProfile, isFollowed} from "../../redux/profile-reducer";
import {authUserIdSelector} from "../../redux/selectors/auth-selectors";
import {MyPosts} from "./MyPosts/MyPosts";

export const ProfilePage = React.memo(() => {
    const dispatch = useDispatch<any>();
    const authUserId = useSelector(authUserIdSelector);

    let {userId} = useParams<ParamsType>();

    useEffect(() => {
        if (!userId && authUserId !== null) {
            userId = authUserId.toString();
            dispatch(isFollowed(Number(userId)));
        }
        dispatch(getUserProfile(Number(userId)));
        dispatch(getStatus(Number(userId)));

    }, [userId, authUserId]);

    if (!userId) return <Navigate to={'/login'}/>;
    return (
        <div>
            <ProfileInfo authUserId={authUserId}/>
            <MyPosts/>
        </div>
    )
})

export type ParamsType = {
    userId: string | undefined
}