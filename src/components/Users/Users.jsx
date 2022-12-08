import styles from "./Users.module.css";
import photo from "../../assets/img/photo.jpg";
import {NavLink} from "react-router-dom";
import Paginator from "./Paginator";

let Users = (props) => {
    return (
        <div>
            <Paginator totalItemsCount={props.totalItemsCount} pageSize={props.pageSize} onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
            {
                props.users.map(u => <div key={u.id}>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <div className={styles.photo}>
                                <img alt='img' src={u.photos.small ? u.photos.small : photo}/>
                            </div>
                        </NavLink>
                        <div>
                            {
                                u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                     onClick={() => {
                                                         props.unfollow(u.id);
                                                     }} className={styles.button}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              onClick={() => {
                                                  props.follow(u.id);
                                              }} className={styles.button}>Follow</button>
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                            <div>{u.id}</div>
                        </div>
                        <div>
                            <div>{'u.location.country'},</div>
                            <div>{'u.location.city'}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>)
}

export default Users;
