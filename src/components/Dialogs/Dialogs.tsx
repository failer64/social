import styles from './Dialogs.module.css'
import {Item} from './Item/Item';
import React, {FC, useEffect, useRef,} from "react";
import {DialogsType} from "../../api/dialogs-api";
import {useDispatch, useSelector} from "react-redux";
import {getDialogsSelector} from "../../redux/selectors/dialogs-selectors";
import {getDialogs} from "../../redux/dialogs-reducer";
import {Navigate} from "react-router-dom";
import {isAuthSelector} from "../../redux/selectors/auth-selectors";


const Dialogs: FC = () => {
    const dialogs = useSelector(getDialogsSelector);
    const isAuth = useSelector(isAuthSelector);
    const dispatch = useDispatch<any>();
    // scroll into top
    const messagesTopRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        messagesTopRef.current?.scrollIntoView()
    }

    useEffect(() => {
        if(isAuth){
            dispatch(getDialogs());
        }

    }, [])

    useEffect(() => {
        scrollToTop();
    }, [dialogs])

    if (!isAuth) return <Navigate to={'/login'}/>;
    return (
        <div className={styles.dialogs}>
            <div ref={messagesTopRef} className={styles.ref}/>
            {dialogs.map((d: DialogsType) => <Item item={d} key={d.id}/>)}
        </div>);
}

export default Dialogs;