import styles from './Message.module.css'
import {FC} from "react";

type PropsType = {
	message: string
	key: number
}

const Message: FC<PropsType> = ({message}) => {
	return (
		<div className={styles.message}>
			{message}
		</div>
	);
}

export default Message;