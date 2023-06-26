import styles from './Header.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";


export const Header: FC = () => {

    const isAuth = useSelector((state: StateType) => state.auth.isAuth);
    const login = useSelector((state: StateType) => state.auth.login);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout(navigate));
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo"/>
            </div>
            <div className={styles.item}>
				<span className={styles.label}>{isAuth ? login :
                    <NavLink className={styles.login} to={'/login'}>
                        <span className={styles.icon}><FontAwesomeIcon icon={faUser}/></span>
                        <span>Login</span>
                    </NavLink>}</span>
                {isAuth && <button className={styles.logout} onClick={onLogout}>Logout</button>}
            </div>
        </header>
    );
}
