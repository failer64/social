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


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(this.props.pageSize, pageNumber);
    }

    render() {
        return (<>
                {this.props.isFetching ? <Preloader/> : null}
                <Users onPageChanged={this.onPageChanged}
                       totalItemsCount={this.props.totalUsersCount}
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

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {setCurrentPage, getUsers, follow, unfollow})
)(UsersContainer);