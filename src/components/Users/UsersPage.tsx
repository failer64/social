import styles from "./Users.module.css";
import {Pagination} from 'antd';
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
    pageSizeSelector, totalUsersCountSelector
} from "../../redux/selectors/users-selectors";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";


const UsersPage: FC = React.memo(() => {
    const isFetching = useSelector(isFetchingSelector);
    const currentPage = useSelector(currentPageSelector);
    const pageSize = useSelector(pageSizeSelector);
    const users = useSelector(getUsersSelector);
    const filter = useSelector(filterSelector);
    const totalItemsCount = useSelector(totalUsersCountSelector);
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
            dispatch(getUsers(actualPage, pageSize, actualFilter));
        } else {
            dispatch(getUsers(currentPage, pageSize, actualFilter));
        }
    }, [])

    useEffect(() => {
        navigate(`/users?page=${currentPage}` +
            (filter.term && `&term=${filter.term}`) +
            (filter.friend !== null ? `&friend=${filter.friend}` : '')
        );
    }, [filter, currentPage, location.search])


    const onPageChanged = (pageNumber: number, pageSize: number) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(getUsers(pageNumber, pageSize, filter));
        // dispatch(getUsers(pageNumber, pageSize, filter));
    }

    const onShowSizeChanged = (current: number = 1, size: number) => {
        dispatch(actions.resizePage(size));
    }

    return (
        <div>
            <SearchForm pageSize={pageSize} filter={filter}/>
            <Pagination onShowSizeChange={onShowSizeChanged} pageSizeOptions={[6, 12, 24, 48]} defaultPageSize={12}
                        total={totalItemsCount} onChange={onPageChanged} current={currentPage}
                        style={{marginBottom: '20px', textAlign: 'center'}}/>
            {isFetching ? <Preloader/> :
                <div className={styles.row}>
                    {
                        users.map(u =>
                            <User key={u.id} user={u}/>
                        )
                    }
                    {!users.length && <div>not found</div>}
                </div>}
            {/*<Paginator pageSize={pageSize} onPageChanged={onPageChanged} currentPage={currentPage}/>*/}

        </div>
    )
})

export default UsersPage

export type ParsedType =
    {
        term: string
        friend: 'null' | 'false' | 'true'
        page: number
    }