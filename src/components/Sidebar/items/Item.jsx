import { NavLink } from 'react-router-dom';
import styles from './Item.module.css'

const Item = (props) => {
	return (
		<li className={styles.item}>
			<NavLink to={props.link} className={navData => navData.isActive ? styles.active : styles.link} >
				{props.text}
			</NavLink>
		</li>
	);
}
export default Item;