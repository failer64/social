import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (<div>
            <ProfileInfo uploadPhoto={props.uploadPhoto} userProfile={props.userProfile}
                         userStatus={props.userStatus} authUserId={props.authUserId}
                         updateStatus={props.updateStatus} uploadProfile={props.uploadProfile}
                         error={props.error}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;