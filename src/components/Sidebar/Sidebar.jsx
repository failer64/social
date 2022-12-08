import styles from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faUsers, faRss, faCommentDots} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {

    return (<aside className={styles.sidebar}>
            <div className={styles.body}>
                <ul className={styles.list}>
                    <li>
                        <span><FontAwesomeIcon icon={faUser}/></span>
                        <NavLink to={'profile/'} className={navData => navData.isActive ? styles.active : styles.link}>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <span><FontAwesomeIcon icon={faCommentDots}/></span>
                        <NavLink to={'dialogs/'} className={navData => navData.isActive ? styles.active : styles.link}>
                            Messages
                        </NavLink>
                    </li>
                    <li>
                        <span><FontAwesomeIcon icon={faRss}/></span>
                        <NavLink to={'news/'} className={navData => navData.isActive ? styles.active : styles.link}>
                            News
                        </NavLink>
                    </li>
                    <li>
                        <span><FontAwesomeIcon icon={faUsers}/></span>
                        <NavLink to={'users/'} className={navData => navData.isActive ? styles.active : styles.link}>
                            Users
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;