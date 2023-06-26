import React, {FC, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {isAuthSelector} from "../../redux/selectors/auth-selectors";
import styles from './Messenger.module.css'
import {MessengerForm} from "./MessengerForm";


export const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

const Messenger: FC = () => {
    const isAuth = useSelector(isAuthSelector);
    if (!isAuth) return <Navigate to={'/login'}/>;
    return (
        <div>
            <Messages/>
            <MessengerForm/>
        </div>
    )
}

const Messages: FC = () => {
    const [messages, setMessages] = useState<MessengerType[]>([]);

    useEffect(() => {
        wsChanel.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages(prevState => [...prevState, ...data]);
        }
    })

    return (
        <div>
            {messages.map((m, index) => <Item key={index} message={m}/>)}
        </div>
    )
}

const Item: FC<PropsType> = ({message}) => {
    const navigate = useNavigate();
    const goToProfile = () => {
        navigate(`/profile/${message.userId}`);
    }
    return (
        <div className={styles.body}>
            <div onClick={goToProfile} className={styles.avatar}>
                <img src={message.photo} alt="avatar"/>
            </div>
            <div>
                <div onClick={goToProfile} className={styles.name}>{message.userName}</div>
                <div className={styles.text}>{message.message}</div>
            </div>
            <hr/>
        </div>
    )
}

export default Messenger

type PropsType = {
    message: MessengerType
}
type MessengerType = {
    message: string
    photo: string
    userId: number
    userName: string
}