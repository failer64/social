import { NavLink } from "react-router-dom";
import styles from "./Item.module.css"

const Item = (props) => {
	let path = '/dialogs/' + props.id;

	return (
		<div className={styles.item}>
			<NavLink to={path}>{props.name}</NavLink>
		</div>
	);
}

export default Item;