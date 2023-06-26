import styles from './Chat.module.css'
import React, {FC, useEffect, useRef} from "react";
import {Field, Form, Formik} from "formik";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {authUserIdSelector} from "../../redux/selectors/auth-selectors";
import {getMessagesSelector} from "../../redux/selectors/dialogs-selectors";
import {addMessage, getChat} from "../../redux/dialogs-reducer";
import {ParamsType} from "../Profile/ProfilePage";
import {Line} from "./Line";


export const Chat: FC = () => {
    const messages = useSelector(getMessagesSelector);
    const authId = useSelector(authUserIdSelector);
    const dispatch = useDispatch<any>();

    // scroll into bottom
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    }

    const {userId} = useParams<ParamsType>();

    useEffect(() => {
        if (!messages.length) {
            dispatch(getChat(Number(userId)));
        }
    }, [userId])

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const onAddMessage = (message: MessageFormType) => {
        dispatch(addMessage(Number(userId), message));
    }
    return (<div className={styles.body}>
            {
                !messages.length ? <div className={styles.null}>Write someone...</div> :
                    messages.map(m => <Line key={m.id} item={m} authId={authId}/>)
            }
            <div ref={messagesEndRef}/>
            <MessageForm onSubmit={onAddMessage}/>
        </div>
    )
}

const MessageForm: FC<MessageFormPropsType> = ({onSubmit}) => {
    return (<>
            <Formik
                initialValues={{
                    newMessage: "",
                }}
                onSubmit={(message, {setSubmitting, resetForm}) => {
                    onSubmit(message);
                    resetForm();
                    setSubmitting(false);
                }}
            >{({isSubmitting}) => (
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <Field type="text" name={'newMessage'} placeholder={'New message...'}/>
                    </div>
                    <button disabled={isSubmitting} type={"submit"} className={styles.button}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </button>
                </Form>
            )}
            </Formik>
        </>
    )
}

type MessageFormPropsType = {
    onSubmit: (message: MessageFormType) => void
}
type MessageFormType = {
    newMessage: string
}