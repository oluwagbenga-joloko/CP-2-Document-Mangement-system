import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import { getAllUsers, deleteUser, searchUser } from '../../actions/userActions';
import SearchBar from '../dashboard/SearchBar';
import UserCard from './UserCard';


/**
 * @desc documentview component
 * @class DocumentView
 * @extends {Component}
 */
export class AllUsers extends Component {
  /**
   * Creates an instance of DocumentView.
   * @param {any} props property of element
   * @memberof DocumentView
   */
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      limit: 10,
      pageCount: null,
      initialPage: 0,
      showPaginate: false,

    };
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof DocumentView
   * @returns {*} has no return value;
   */
  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.setState({ query: parsed.query ? parsed.query : '' });
    const payload = {
      query: parsed.query ? parsed.query : '',
      limit: 10,
      offset: parsed.page ? (parsed.page - 1) * 10 : 0,
    };
    this.props.searchUser(payload).then(() => {
      this.setState({
        users: this.props.users,
        showPaginate: true,
      });
    });
  }
  /**
   * @desc runs when compoent recieves new props;
   * @param {any} nextProps next property of element
   * @memberof DocumentView
   *  @returns {*} has no return value;
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      const parsed = queryString.parse(nextProps.location.search);
      this.setState({ query: parsed.query ? parsed.query : '' });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: 10,
        offset: parsed.page ? (parsed.page - 1) * 10 : 0,
      };
      this.props.searchUser(payload);
    } else {
      this.setState({
        users: nextProps.users,
      });
    }
  }
  /**
   * @desc hanldes delete of document
   * @param {string} firstName first Name of user to be deleted
   * @param {string} lastName last Name of user to be deleted
   * @param {number} userId id of user to be deleted
   * @returns {*} has no return value;
   * @memberof DocumentView
   */
  deleteUser(firstName, lastName, userId) {
    swal({
      title: `Are you sure you want to delete ${firstName} ${lastName}?`,
      text: 'The user account cannot be recovered again!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel plx!',
      closeOnConfirm: false,
      closeOnCancel: false
    },
(isConfirm) => {
  if (isConfirm) {
    swal('Deleted!', 'User account has been deleted.', 'success');
    this.props.deleteUser(userId).then(() => {
      const parsed = queryString.parse(this.props.location.search);
      this.setState({ query: parsed.query ? parsed.query : '' });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: 10,
        offset: parsed.page ? (parsed.page - 1) * 10 : 0,
      };
      this.props.searchUser(payload);
    });
  } else {
    swal('Cancelled', 'User account is safe :)', 'error');
  }
});
  }
  /**
   * @desc handles click of pagination
   * @param {any} data value of clicked pagination button;
   * @returns {null} no return value
   * @memberof AllUsers
   */
  handlePageClick(data) {
    const selected = data.selected;
    const page = selected + 1;
    const queryUrl =
     `query=${this.state.query}&page=${page}`;
    this.props.history.replace(`${this.props.location.pathname}?${queryUrl}`);
  }
  /**
   * @desc renders html
   * @returns {*} html
   * @memberof DocumentView
   */
  render() {
    let users;
    if (this.state.users) {
      users = this.state.users.map((user) => {
        const props = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userId: user.id,
          deleteUser: this.deleteUser,
          userRoleId: user.roleId,
          roleTitle: user.Role.title
        };
        return <UserCard key={user.id} {...props} />;
      });
    } else {
      users = null;
    }
    return (
      <div>
        <h3 className=" header-dash">Users</h3>
        <SearchBar
          url={this.props.location.pathname}
          query={this.state.query}
        />
        {
          this.state.users &&
          <div>
            {
            this.props.loading &&
            <div className="progress">
              <div className="indeterminate" />
            </div>

        }
            {
          this.state.users.length < 1 && !this.props.loading &&
          <div className="center-align">
            <h4 className="no-users">No users found</h4>
          </div>
        }
            { this.state.users.length >= 1 &&
            <div className="row user-list">
              <ul className="collection">
                {users}
              </ul>
            </div>
        }
            {this.state.showPaginate && this.state.users.length > 0 &&
            <div className="center-align">
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<a href="">...</a>}
                breakClassName={'break-me'}
                pageCount={this.props.pagination.pageCount}
                forcePage={this.props.pagination.page - 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
        }
          </div>
        }
      </div>
    );
  }
}
/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUsers,
  deleteUser,
  searchUser
}, dispatch);
/**
 * @desc maps state to props;
 * @param {*} state sore state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  users: state.userReducer.users,
  pagination: state.userReducer.pagination,
  loading: state.ajaxCallReducer.loading,
});
AllUsers.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string }).isRequired,
  searchUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({ replace: PropTypes.func.isRequired }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageCount: PropTypes.number
  }).isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
