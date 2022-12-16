import styles from './MyPosts.module.css'
import Post from './../posts/Post'
import {Form, Formik} from "formik";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'


const PostForm = (props) => {
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
                        <textarea name="newText" placeholder="your news..."></textarea>
                        {/*<Field name='newText' placeholder="your news..."/>*/}
                    </div>
                    {props.error ? <div className={styles.error}>{props.error}</div> : null}
                    <button type={"submit"} className={styles.button}>send</button>
                </Form>
            </Formik>
        </div>
    )
};

const MyPosts = (props) => {
    let postsElements = props.posts.map
    (p => <Post message={p.postMessage} key={p.id} avatar={p.image} likesCount={p.likesCount}/>);

    const onAddPost = (values) => {
        props.addPost(values.newText);
    }

    return (
        <div>
            <div className={styles.form}>
                <div className={styles.title}>
                    <span><FontAwesomeIcon icon={faPen}/></span>
                    <h3>Create Post</h3>
                </div>
                <PostForm onSubmit={onAddPost}/>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;