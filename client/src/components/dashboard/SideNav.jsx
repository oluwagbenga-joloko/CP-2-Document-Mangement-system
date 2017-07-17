import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * @desc side Navigation component
 * @param {object} props
 * @returns {*} html
 */
const SideNav = ({ user, url, logout }) => (
  <div>
    <ul id="slide-out" className="side-nav z-depth-3 fixed">
      <li>
        <div className="userView">
          <div className="background side_nav_head" />
          <div className="row center-align nav-icon">
            <i className="material-icons side_nav_avatar ">account_box</i>
          </div>
          <p
            className="side_nav_name center-align"
          >{user.firstName} {user.lastName}</p>
        </div></li>
      <li><div className="divider nav_divider" /></li>
      <li>
        <Link
          to={`${url}/createdocument`}
          id="createdocument"
          className="waves-effect side-nav-link"
        >
          <i className="material-icons side-nav-link-av">add_circle</i>
          Create document
        </Link>
      </li>
      <li>
        <Link
          to={`${url}`}
          id="my-documents"
          className="waves-effect side-nav-link"
        >
          <i className="material-icons side-nav-link-av">folder</i>
        My documents
        </Link>
      </li>
      <li>
        <Link
          id="general-documents"
          className="waves-effect side-nav-link"
          to={`${url}/generalDocuments`}
        >
          <i className="material-icons side-nav-link-av">public</i>
          General Documents
        </Link>
      </li>
      <li>
        <Link
          id="edit-profile"
          className="waves-effect side-nav-link"
          to={`${url}/editprofile`}
        >
          <i className="material-icons side-nav-link-av">mode_edit</i>
          Edit Profile
        </Link>
      </li>
      {user.roleId === 1 &&
      <li>
        <Link
          id="manage-users"
          className="waves-effect side-nav-link"
          to={`${url}/users`}
        >
          <i className="material-icons side-nav-link-av">people</i>
          Manage users
        </Link>
      </li>
      }
      <li>
        <a
          tabIndex={0}
          role="button"
          className="waves-effect side-nav-link logout"
          onClick={(e) => { e.preventDefault(); logout(); }}
        >
          <i className="material-icons side-nav-link-av">exit_to_app</i>
          Log out
        </a>
      </li>
    </ul>
  </div>
);

SideNav.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
  .isRequired,
  url: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};
export default SideNav;

