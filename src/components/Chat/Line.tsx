import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {deleteMessage} from "../../redux/dialogs-reducer";
import cn from "classnames";
import styles from "./Chat.module.css";
import defaultAvatar from "../../assets/img/avatar.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MessageType} from "../../api/dialogs-api";

export const Line: FC<LinePropsType> = ({item, authId}) => {
    const dispatch = useDispatch<any>();
    const onDeleteMessage = (id: number) => {
        dispatch(deleteMessage(id));
    }
    return (
        <div className={cn(styles.item, {[styles.user]: authId === item.senderId})}>
            <div className={styles.block}>
                <div className={styles.info}>
                    <div className={styles.image}>
                        <img src={defaultAvatar} alt="Avatar"/>
                    </div>
                    <div className={styles.description}>
                        <div className={styles.name}>
                            {item.senderName}
                            <span>
                                {
                                    authId === item.senderId && (
                                        item.viewed ? <FontAwesomeIcon icon={faEye}/> :
                                            <FontAwesomeIcon icon={faEyeSlash}/>)
                                }
                            </span>
                        </div>
                        <div className={styles.date}>{item.addedAt}</div>
                    </div>
                </div>
                <div className={styles.message}>
                    {item.body}
                </div>
                {
                    authId === item.senderId &&
                    <div className={styles.delete} onClick={() => onDeleteMessage(item.id)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>
                }
            </div>
        </div>
    )
}

type LinePropsType = {
    item: MessageType
    authId: number | null
}