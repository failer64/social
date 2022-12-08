import styles from './Header.module.css'
import { NavLink } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src={logo} alt="Logo" />
			</div>
			<div className={styles.item}>
				<span className={styles.label}>{props.isAuth ? props.login : <NavLink className={styles.login} to={'/login'}>
					<span><FontAwesomeIcon icon={faUser}/></span>
					<span>Login</span>
				</NavLink>}</span>
				{props.isAuth ? <button className={styles.logout} onClick={props.logout}>Logout</button> : ''}
			</div>
		</header>
	);
}

export default Header;