import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {StatusWithHooks} from "./Status/StatusWithHooks";
import defaultAvatar from './../../../assets/img/avatar.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCloudArrowUp} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-regular-svg-icons'
import {FC, useState} from "react";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";
import {useNavigate} from "react-router-dom";
import {getChat, startChat} from "../../../redux/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfileSelector, profileIsFollowSelector} from "../../../redux/selectors/profile-selectors";
import {uploadPhoto, uploadProfile} from "../../../redux/profile-reducer";
import {ProfileData} from "./ProfileData/ProfileData";
import {follow, unfollow} from "../../../redux/users-reducer";
import {InfoType} from "../../../types/types";


export const ProfileInfo: FC<PropsType> = ({authUserId}) => {
    let [editMode, setEditMode] = useState(false);

    const userProfile = useSelector(getUserProfileSelector);
    const isFollow = useSelector(profileIsFollowSelector);

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();


    if (!userProfile) {
        return <Preloader/>
    }
    const onSubmit = (profile: InfoType) => {
        dispatch(uploadProfile(profile)).then(() => {
            setEditMode(false);
        })
    }

    const addPhoto = (e: any) => {
        if (e.target.files.length) {
            dispatch(uploadPhoto(e.target.files[0]));
        }
    }

    const onAddChat = () => {
        const id = userProfile.userId;
        dispatch(startChat(id));
        if (authUserId && (id !== authUserId)) {
            dispatch(getChat(id));
            navigate(`/dialogs/${id}`);
        }
    }
    const onToggleFriend = (e: boolean) => {
        if (e) {
            dispatch(follow(userProfile.userId))
        } else {
            dispatch(unfollow(userProfile.userId))
        }
    }

    return (<div className={styles.container}>
        <div className={styles.background}>
            <img
                src={userProfile.photos.large ||
                    'https://s.zefirka.net/images/2020-09-21/krasota-prirody-na-fotografiyax/krasota-prirody-na-fotografiyax-17.jpg'}
                alt="background"/>
        </div>
        <div className={styles.body}>
            <div className={styles.avatar}>
                <div>
                    <img src={userProfile.photos.small || defaultAvatar} alt="avatar"/>
                </div>
                {(userProfile.userId === authUserId) && <span className={styles.file}>
                            <FontAwesomeIcon icon={faCloudArrowUp}/>
                            <input type="file" onChange={addPhoto}/>
                        </span>
                }
            </div>
            <div className={styles.block}>
                <div className={styles.fullName}>
                    {userProfile.fullName}
                </div>

                <StatusWithHooks userId={userProfile.userId} authUserId={authUserId}/>

                {editMode ?
                    <ProfileDataForm userProfile={userProfile} onSubmit={onSubmit}/> :
                    <ProfileData goToEditMode={() => setEditMode(true)} userProfile={userProfile}
                                 authUserId={authUserId}/>}

            </div>
            {authUserId && (authUserId !== userProfile.userId) &&
                <div className={styles.actions}>
                    {authUserId && isFollow ?
                        <button onClick={() => onToggleFriend(false)} className={styles.friend}>delete friend</button>
                        : <button onClick={() => onToggleFriend(true)} className={styles.friend}>add friend</button>}
                    <button className={styles.message} onClick={onAddChat}>
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </button>
                </div>
            }
        </div>
    </div>);
}

type PropsType = {
    authUserId: number | null
}