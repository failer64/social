import styles from './Post.module.css'

const Post = (props) => {
	let onAddLike = () => {
		// props.addLike();
	}

	let onChangeLike = (e) => {
		//props.changeLike(e.target.value);
	}
	return (
		<div className={styles.body}>
			<div className={styles.avatar}>
				<img src={props.avatar} alt="Аватар" />
				{props.avatar}
			</div>
			<div className={styles.block}>
				<div className={styles.text}>
					{props.message}
				</div>
				<div className={styles.box}>
					<button onClick={onAddLike} type="button" className={styles.button}>Likes</button>
					<div className={styles.likesCount}>
						<input onChange={onChangeLike} value={props.likesCount} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;