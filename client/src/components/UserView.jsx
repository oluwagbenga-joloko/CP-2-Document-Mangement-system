import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import queryString from 'query-string';
import { getAllUsers, deleteUser, searchUser } from '../actions/userActions';
import SearchBar from './SearchBar.jsx';
import UserCard from './UserCard.jsx';


/**
 * @desc documentview component
 * @class DocumentView
 * @extends {Component}
 */
class UserView extends Component {
  /**
   * Creates an instance of DocumentView.
   * @param {any} props property of element
   * @memberof DocumentView
   */
  constructor(props) {
    super(props);
    this.state = {
      users: [{}],
      query: ''
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.searchUser = this.searchUser.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof DocumentView
   * @returns {*} has no return value;
   */
  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search);
    if (parsed.query) {
      this.setState({ query: parsed.query });
      this.props.searchUser(parsed.query).then(() => {
        this.setState({ users: this.props.users });
      });
    } else {
      this.props.getAllUsers().then(() => {
        this.setState({ users: this.props.users });
      });
    }
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
      this.props.searchUser(parsed.query);
    } else {
      this.setState({ users: nextProps.users });
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
      text: 'You will not be able to recover this imaginary file!',
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
    swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
    this.props.deleteUser(userId).then(() => {
      this.props.getAllUsers();
    });
  } else {
    swal('Cancelled', 'Your imaginary file is safe :)', 'error');
  }
});
  }
  /**
   * @desc renders html
   * @returns {*} html
   * @memberof DocumentView
   */
  render() {
    const users = this.state.users.map((user) => {
      const props = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.id,
        deleteUser: this.deleteUser,
        userRoleId: user.roleId
      };
      return <UserCard {...props} />;
    });
    return (
      <div>
        <h1>users</h1>
        <SearchBar
          url={this.props.location.pathname}
          query={this.state.query}
        />
        <div className="row">
          <ul className="collection">
            {users}
          </ul>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUsers,
  deleteUser,
  searchUser
}, dispatch);

const mapStateToProps = state => ({
  users: state.userReducer.users,
  userId: state.authReducer.user.id
});
UserView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string }).isRequired,
  searchUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape).isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(UserView);
