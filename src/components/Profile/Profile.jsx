import Description from './desc/Desc'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
    return (<div>
            <Description userProfile={props.userProfile} userStatus={props.userStatus}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;