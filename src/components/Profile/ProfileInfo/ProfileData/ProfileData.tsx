import styles from "../ProfileInfo.module.css";
import {FC} from "react";
import {ProfileType} from "../../../../types/types";


export const ProfileData: FC<PropsType> = ({userProfile, goToEditMode, authUserId}) => {

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
                //@ts-ignored
                .filter((keyName) => userProfile.contacts[keyName])
                .map((keyName) => (
                    //@ts-ignored
                    <Contact key={keyName} contactTitle={keyName} contactValue={userProfile.contacts[keyName]}/>
                ))}
        </div>
        {authUserId === userProfile.userId &&
            <div>
                <button className={styles.button} onClick={goToEditMode}>Edit</button>
            </div>}
    </>)
}

const Contact: FC<ContactPropsType> = ({contactTitle, contactValue}) => {

    return (<div className={styles.contactItem}>
        <h6 className={styles.subtitle}>{contactTitle}: </h6>
        <span className={styles.social}>{contactValue}</span>
    </div>)
}

type PropsType = {
    userProfile: ProfileType
    authUserId: number | null
    goToEditMode: () => void
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}