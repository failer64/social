import styles from './MyPosts.module.css'
import {Post} from '../posts/Post'
import {Field, Form, Formik} from "formik";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../redux/profile-reducer";
import {FC} from "react";
import {getProfilePostsSelector} from "../../../redux/selectors/profile-selectors";


export const MyPosts: FC = () => {
    const posts = useSelector(getProfilePostsSelector);

    const postsElements = posts.map(p => <Post post={p} key={p.id}/>);

    return (
        <div>
            <div className={styles.form}>
                <div className={styles.title}>
                    <span><FontAwesomeIcon icon={faPen}/></span>
                    <h3>Create Post</h3>
                </div>
                <PostForm/>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
}

const PostForm: FC = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <Formik
                initialValues={{
                    newText: '',
                }}
                onSubmit={(values: ValuesType, {setSubmitting, resetForm}) => {
                    if (values.newText) {
                        dispatch(actions.addPost(values.newText));
                    }
                    resetForm();
                    setSubmitting(false);
                }}
            >{({isSubmitting}) => (
                <Form className={styles.body}>
                    <div className={styles.input}>
                        <Field name="newText" as={'textarea'} placeholder="your news..."/>
                    </div>
                    {/*{error ? <div className={styles.error}>{error}</div> : null}*/}
                    <button disabled={isSubmitting} type={"submit"} className={styles.button}>send</button>
                </Form>
            )}
            </Formik>
        </div>
    )
};

type ValuesType = {
    newText: string
}