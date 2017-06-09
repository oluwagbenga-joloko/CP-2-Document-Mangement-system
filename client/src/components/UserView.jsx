import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { getAllUsers, deleteUser } from '../actions/userActions';
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
    };
    this.deleteUser = this.deleteUser.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof DocumentView
   * @returns {*} has no return value;
   */
  componentWillMount() {
    // console.log('sweetalert');
    // swal({
    //   title: 'Sweet!',
    //   text: "Here's a custom image.",
    //   imageUrl: 'images/thumbs-up.jpg'
    // });
    console.log(getAllUsers);
    this.props.getAllUsers().then(() => {
      this.setState({ users: this.props.users });
    });
  }
  /**
   * @desc runs when compoent recieves new props;
   * @param {any} nextProps next property of element
   * @memberof DocumentView
   *  @returns {*} has no return value;
   */
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.users.length !== nextProps.users.length) {
      console.log(nextProps.users);
      // const documents =
      this.setState({ users: nextProps.users });
      console.log(this.state);
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
  deleteUser
}, dispatch);

const mapStateToProps = state => ({
  users: state.userReducer.users,
  userId: state.authReducer.user.id
});
UserView.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape).isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(UserView);
