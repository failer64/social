import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import StatusWithHooks from "./StatusWithHooks";
import defaultAvatar from './../../../assets/img/avatar.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCloudArrowUp} from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.userProfile) {
        return <Preloader/>
    }
    const onSubmit = (profile) => {
        props.uploadProfile(profile).then(() => {
            setEditMode(false);
        });
    }

    const addPhoto = (e) => {
        if (e.target.files.length) {
            props.uploadPhoto(e.target.files[0]);
        }
    }

    return (<div className={styles.container}>
        <div className={styles.background}>
            <img
                src={props.userProfile.photos.large || 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612704873_4-p-zelenii-fon-park-12.jpg'}
                alt="background"/>
        </div>
        <div className={styles.body}>
            <div className={styles.avatar}>
                <div>
                    <img src={props.userProfile.photos.small || defaultAvatar} alt="avatar"/>
                </div>
                {(props.userProfile.userId === props.authUserId) && <span className={styles.file}>
                            <FontAwesomeIcon icon={faCloudArrowUp}/>
                            <input type="file" onChange={addPhoto}/>
                        </span>
                }
            </div>
            <div className={styles.block}>
                <div className={styles.fullName}>
                    {props.userProfile.fullName}
                </div>

                <StatusWithHooks userStatus={props.userStatus} updateStatus={props.updateStatus}
                                 userId={props.userProfile.userId} authUserId={props.authUserId}/>

                {editMode ?
                    <ProfileDataForm error={props.error} userProfile={props.userProfile} onSubmit={onSubmit}/> :
                    <ProfileData goToEditMode={() => setEditMode(true)} userProfile={props.userProfile}
                                 authUserId={props.authUserId}/>}

            </div>
        </div>
    </div>);
}

const ProfileData = ({userProfile, goToEditMode, authUserId}) => {
    return (<>
        <div className={styles.item}>
            <h4 className={styles.title}>Looking for a job:</h4>
            <span className={styles.text}>
                {userProfile.lookingForAJob ? 'yes' : 'no'}
            </span>
        </div>
        {userProfile.lookingForAJob &&
            <div className={styles.item}>
                <h4 className={styles.title}>My Skills:</h4>
                <span className={styles.text}>
                {userProfile.lookingForAJobDescription}
            </span>
            </div>
        }
        <div className={styles.item}>
            <h4 className={styles.title}>About Me:</h4>
            <span className={styles.text}>
                {userProfile.aboutMe}
            </span>
        </div>

        <div className={styles.item}>
            <h4 className={styles.title}>Contacts:</h4>
            {Object.keys(userProfile.contacts)
                .filter(keyName => userProfile.contacts[keyName])
                .map(keyName => (
                    <Contact key={keyName} contactTitle={keyName} contactValue={userProfile.contacts[keyName]}/>
                ))}
        </div>
        {authUserId === userProfile.userId &&
            <div>
                <button className={styles.button} onClick={goToEditMode}>Edit</button>
            </div>}
    </>)
}

const Contact = ({contactTitle, contactValue}) => {
    
    return (<div className={styles.contactItem}>
        <h6 className={styles.subtitle}>{contactTitle}: </h6>
        <span className={styles.social}>{contactValue}</span>
    </div>)
}

export default ProfileInfo;