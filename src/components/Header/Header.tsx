import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
// @ts-ignore
import logo from "./../../assets/img/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React, {FC} from "react";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: FC<PropsType> = ({isAuth, login, logout}) => {

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
                {isAuth && <button className={styles.logout} onClick={logout}>Logout</button>}
            </div>
        </header>
    );
}

export default Header;