import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHighlighter} from '@fortawesome/free-solid-svg-icons'
import styles from './Status.module.css'

const StatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.userStatus);

    useEffect(() => {
        setStatus(props.userStatus);
    }, [props.userStatus]);

    let activateEditMode = () => {
        if (props.userId === props.authUserId) {
            setEditMode(true);
        }
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    let onStatusChange = (e) => {
        setStatus(e.target.value);
    }

    return (
        <div className={styles.body}>
            {!editMode &&
                <div className={styles.block} onDoubleClick={activateEditMode}>
                    {props.userId === props.authUserId &&
                        <span className={styles.icon}><FontAwesomeIcon icon={faHighlighter}/></span>
                    }

                    <span className={styles.status}>{props.userStatus}</span>
                </div>
            }
            {editMode &&
                <div className={styles.input}>
                    <input onChange={onStatusChange} autoFocus={true}
                           onBlur={deactivateEditMode} value={status}/>
                </div>
            }
        </div>
    )
}

export default StatusWithHooks