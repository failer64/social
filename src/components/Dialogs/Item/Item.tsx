import {NavLink} from "react-router-dom";
import styles from "./Item.module.css"
import {FC} from "react";

type PropsType = {
    name: string
    id: number
}

const Item: FC<PropsType> = ({name, id}) => {
    let path = '/dialogs/' + id;

    return (
        <div className={styles.item}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    );
}

export default Item;