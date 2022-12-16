import {connect} from 'react-redux';
import Users from './Users'
import {
    setCurrentPage,
    getUsers, follow, unfollow
} from '../../redux/users-reducer'
import React from 'react';
import Preloader from '../common/Preloader/Preloader';
import {compose} from "redux";
import {
    currentPage, followingInProgress,
    getUsersSuperSelector, isFetching, pageSize, totalUsersCount
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {StateType} from "../../redux/redux-store";


type MapStatePropsType = {
    pageSize: number
    currentPage: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<UserType>
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (page: number) => void
}
type OwnPropsType = {

}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        //const {currentPage, pageSize} = this.props;
        this.props.getUsers( this.props.currentPage, this.props.pageSize);
        // this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
        //const {pageSize} = this.props;
        //this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return (<>
                {this.props.isFetching ? <Preloader/> : null}
                <Users onPageChanged={this.onPageChanged}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       followingInProgress={this.props.followingInProgress}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                />
            </>
        )
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: pageSize(state),
        totalUsersCount: totalUsersCount(state),
        currentPage: currentPage(state),
        isFetching: isFetching(state),
        followingInProgress: followingInProgress(state),
    }
}



export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>(
        mapStateToProps,
        {follow, unfollow, getUsers, setCurrentPage})
)(UsersContainer);