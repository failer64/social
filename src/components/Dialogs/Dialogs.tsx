import styles from './Dialogs.module.css'
import Item from './Item/Item';
import Message from './Message/Message';
import {Field, Form, Formik} from "formik";
import {FC} from "react";
import {DialogsType, MessageType} from "../../types/types";

type PropsFormType = {
    onSubmit: (values: ValuesType) => void
}
type ValuesType = {
    newText: string
}

type PropsDialogsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    addMessage: (text: string) => void
}

const MessageForm: FC<PropsFormType> = ({onSubmit}) => {
    return (
        <div>
            <Formik
                initialValues={{
                    newText: "",
                }}
                onSubmit={values => {
                    onSubmit(values);
                }}
            >
                <Form className={styles.body}>
                    <div className={styles.input}>
                        {/*<textarea name="newText" placeholder="your news..."></textarea>*/}
                        <Field name='newText' placeholder="your news..."/>
                    </div>
                    {/*{props.error ? <div className={styles.error}>{props.error}</div> : null}*/}
                    <button type={"submit"} className={styles.button}>send</button>
                </Form>
            </Formik>
        </div>
    )
};

const Dialogs: FC<PropsDialogsType> = ({dialogs, messages, addMessage}) => {

    let onAddMessage = (values: ValuesType) => {
        addMessage(values.newText);
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.items}>
                {dialogs.map(i => <Item name={i.name} id={i.id} key={i.id}/>)}
            </div>
            <div className={styles.messages}>
                {messages.map(m => <Message message={m.message} key={m.id}/>)}
                <MessageForm onSubmit={onAddMessage}/>
            </div>
        </div>);
}

export default Dialogs;