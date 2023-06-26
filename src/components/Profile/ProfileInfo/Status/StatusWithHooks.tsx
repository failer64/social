import {FC, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHighlighter} from '@fortawesome/free-solid-svg-icons'
import styles from './Status.module.css'
import {useDispatch, useSelector} from "react-redux";
import {userStatusSelector} from "../../../../redux/selectors/profile-selectors";
import {updateStatus} from "../../../../redux/profile-reducer";

export const StatusWithHooks: FC<PropsType> = ({userId, authUserId}) => {
    const userStatus = useSelector(userStatusSelector);

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(userStatus);

    const dispatch = useDispatch<any>();

    useEffect(() => {
        setStatus(userStatus);
    }, [userStatus]);

    let activateEditMode = () => {
        if (userId === authUserId) {
            setEditMode(true);
        }
    }

    let deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status));
    }

    let onStatusChange = (e: any) => {
        setStatus(e.target.value);
    }

    return (
        <div className={styles.body}>
            {!editMode &&
                <div className={styles.block} onDoubleClick={activateEditMode}>
                    {userId === authUserId &&
                        <span className={styles.icon}><FontAwesomeIcon icon={faHighlighter}/></span>
                    }

                    <span className={styles.status}>{userStatus}</span>
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

type PropsType = {
    userId: number
    authUserId: number | null
}