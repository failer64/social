import styles from "./Users.module.css";
// @ts-ignore
import photo from "../../assets/img/photo.jpg";
import {NavLink} from "react-router-dom";
import {FC} from "react";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (<div key={user.id} className={styles.block}>
        <div className={styles.top}>
            <NavLink to={'/profile/' + user.id}>
                <div className={styles.photo}>
                    <img alt='img' src={user.photos.small || photo}/>
                </div>
            </NavLink>
        </div>
        <div className={styles.description}>
            <div>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.status}>{user.status}</div>
                <div className={styles.text}>id: {user.id}</div>
            </div>
        </div>
        <div>
            {
                user.followed ? <button disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            unfollow(user.id);
                                        }} className={styles.button}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id);
                              }} className={styles.button}>Follow</button>
            }
        </div>
    </div>)
}

export default User