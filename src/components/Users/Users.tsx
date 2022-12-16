import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import {FC} from "react";
import {UserType} from "../../types/types";
import User from './User'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: FC<PropsType> = ({
                                  totalUsersCount, pageSize, onPageChanged,
                                  users, currentPage, followingInProgress,
                                  follow, unfollow
                              }) => {
    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       onPageChanged={onPageChanged} currentPage={currentPage}/>
            <div className={styles.row}>
                {
                    users.map(u =>
                        <User key={u.id} user={u} followingInProgress={followingInProgress} unfollow={unfollow}
                              follow={follow}/>
                    )
                }
            </div>
        </div>)
}

export default Users;
