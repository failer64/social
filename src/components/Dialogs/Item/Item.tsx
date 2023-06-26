import {NavLink} from "react-router-dom";
import styles from "./Item.module.css"
import React, {FC} from "react";
import {DialogsType} from "../../../api/dialogs-api";
import defaultAvatar from './../../../assets/img/avatar.jpg'
import cn from "classnames";
import {useDispatch} from "react-redux";
import {getChat} from "../../../redux/dialogs-reducer";


export const Item: FC<PropsType> = ({item}) => {
    const dispatch = useDispatch<any>();

    let path = '/dialogs/' + item.id;

    const chat = (id: number) => {
        dispatch(getChat(id));
    }

    return (<NavLink to={path} className={cn(styles.item, {[styles.message]: item.hasNewMessages})}
                     onClick={() => chat(item.id)}>
            <div className={styles.image}>
                <img src={item.photos.small || defaultAvatar} alt="Avatar"/>
            </div>
            <div className={styles.name}>
                {item.userName}
            </div>
            <div className={styles.content}></div>
            <div className={styles.date}>
                {item.lastDialogActivityDate}
            </div>
        </NavLink>
    );
}

type PropsType = {
    item: DialogsType
}