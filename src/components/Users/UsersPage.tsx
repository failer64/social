import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from './User'
import {useDispatch, useSelector} from "react-redux";
import React, {FC, useEffect} from "react";
import {actions, getUsers} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {SearchForm} from "./SearchForm";
import {
    currentPageSelector,
    filterSelector,
    getUsersSelector,
    isFetchingSelector,
    pageSizeSelector
} from "../../redux/selectors/users-selectors";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";


const UsersPage: FC = React.memo(() => {
    const isFetching = useSelector(isFetchingSelector);
    const currentPage = useSelector(currentPageSelector);
    const pageSize = useSelector(pageSizeSelector);
    const users = useSelector(getUsersSelector);
    const filter = useSelector(filterSelector);
    const dispatch = useDispatch<any>();

    const location = useLocation();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams(location.search);

    useEffect(() => {
        // @ts-ignore
        const parsed: ParsedType = Object.fromEntries([...searchParams]);

        const actualPage = Number(parsed.page);
        let actualFilter = filter;

        actualFilter.term = parsed.term;
        if (actualFilter.term === undefined) {
            actualFilter.term = '';
        }
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        if (actualPage) {
            dispatch(actions.setCurrentPage(actualPage));
        }
        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, [])

    useEffect(() => {
        navigate(`/users?page=${currentPage}` +
            (filter.term && `&term=${filter.term}`) +
            (filter.friend !== null ? `&friend=${filter.friend}` : '')
        );
    }, [filter, currentPage, location.search])


    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(getUsers(pageNumber, pageSize, filter));
    }

    return (
        <div>
            <SearchForm pageSize={pageSize} filter={filter}/>
            <Paginator pageSize={pageSize} onPageChanged={onPageChanged} currentPage={currentPage}/>
            {isFetching ? <Preloader/> :
                <div className={styles.row}>
                    {
                        users.map(u =>
                            <User key={u.id} user={u}/>
                        )
                    }
                    {!users.length && <div>not found</div>}
                </div>}
        </div>)
})

export default UsersPage

export type ParsedType = {
    term: string
    friend: 'null' | 'false' | 'true'
    page: number
}