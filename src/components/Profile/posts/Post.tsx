import styles from './Post.module.css'
import {FC} from "react";
import {PostsType} from "../../../types/types";


export const Post: FC<PropsType> = ({post}) => {

    const onAddLike = () => {

    }

    return (
        <div className={styles.body}>
            <div className={styles.avatar}>
                <img src={post.image} alt="Аватар"/>
            </div>
            <div className={styles.block}>
                <div className={styles.text}>
                    {post.postMessage}
                </div>
                <div className={styles.box}>
                    <button onClick={onAddLike} type="button" className={styles.button}>Likes</button>
                    <div className={styles.likesCount}>
                        {/*<input value={post.likesCount}/>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

type PropsType = {
    post: PostsType
}
