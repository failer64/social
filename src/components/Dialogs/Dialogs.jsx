import styles from './Dialogs.module.css'
import Item from './Item/Item';
import Message from './Message/Message';
import {Field, Form, Formik} from "formik";

const MessageForm = (props) => {
    return (
        <div>
            <Formik
                initialValues={{
                    newText: "",
                }}
                onSubmit={values => {
                    props.onSubmit(values);
                }}
            >
                <Form className={styles.body}>
                    <div className={styles.input}>
                        {/*<textarea name="newText" placeholder="your news..."></textarea>*/}
                        <Field name='newText' placeholder="your news..."/>
                    </div>
                    {props.error ? <div className={styles.error}>{props.error}</div> : null}
                    <button type={"submit"} className={styles.button}>send</button>
                </Form>
            </Formik>
        </div>
    )
};

const Dialogs = (props) => {
    let dialogs = props.dialogsPage.dialogs.map(i => <Item name={i.name} key={i.id}/>);
    let messages = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

    let onAddMessage = (values) => {
        props.addMessage(values.newText);
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.items}>
                {dialogs}
            </div>
            <div className={styles.messages}>
                {messages}
                <MessageForm onSubmit={onAddMessage}/>
            </div>
        </div>);
}

export default Dialogs;