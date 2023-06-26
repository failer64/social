import styles from "./Users.module.css";
import img from "./../../assets/img/photo.jpg";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {follow, unfollow} from "../../redux/users-reducer";
import {FC} from "react";
import {filterSelector, followingInProgressSelector} from "../../redux/selectors/users-selectors";
import {UserType} from "../../types/types";
import {isAuthSelector} from "../../redux/selectors/auth-selectors";

const User: FC<PropsType> = ({user}) => {

    const dispatch = useDispatch<any>();
    const followingInProgress = useSelector(followingInProgressSelector);
    const isAuth = useSelector(isAuthSelector);

    return (<div key={user.id} className={styles.block}>
        <div className={styles.top}>
            <NavLink to={'/profile/' + user.id}>
                <div className={styles.photo}>
                    <img alt='img' src={user.photos.small || img}/>
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
        {
            user.followed ? <button disabled={followingInProgress.some(id => id === user.id) || !isAuth}
                                    onClick={() => {
                                        dispatch(unfollow(user.id));
                                    }} className={styles.button}>delete</button>
                : <button disabled={followingInProgress.some(id => id === user.id) || !isAuth}
                          onClick={() => {
                              dispatch(follow(user.id));
                          }} className={styles.button}>add friend</button>
        }
    </div>)
}

export default User

type PropsType = {
    user: UserType
}