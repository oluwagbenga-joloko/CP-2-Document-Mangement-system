import React from 'react';
import PropTypes from 'prop-types';


const UserCard = ({
  firstName,
  lastName,
  email,
  deleteUser,
  userId,
  userRoleId,
  roleTitle
}) => (
  <li className="collection-item avatar">
    <i className="material-icons circle user-icon">perm_identity</i>
    <span className="title">Title: {roleTitle}</span>
    { userRoleId !== 1 &&
      <a
        role="button"
        className="waves-effect waves-light btn deleteUser right-align"
        onClick={(e) => {
          e.preventDefault();
          deleteUser(firstName, lastName, userId);
        }}
      ><i className="material-icons left">delete_forever</i>Delete</a>
    }
    <p>Name: {firstName} {lastName}
      <br />
      Email: {email}
    </p>
  </li>
  );
UserCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  userRoleId: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired
};
export default UserCard;
