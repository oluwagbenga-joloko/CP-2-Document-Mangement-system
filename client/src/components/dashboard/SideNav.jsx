import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideNav = ({ user, url, logout }) => (
  <div>
    <ul id="slide-out" className="side-nav z-depth-3 fixed">
      <li>
        <div className="userView">
          <div className="background side_nav_head" />
          <div className="row">
            <div className="col s4 ">
              <i className="material-icons side_nav_avatar">person_outline</i>
            </div>
            <div className="col s8">
              <p className="side_nav_name">{user.firstName} {user.lastName}</p>
            </div>
          </div>
        </div></li>

      <li><div className="divider nav_divider" /></li>
      <li>
        <Link
          to={`${url}`}
          className="waves-effect side-nav-link"
        >
          <i className="material-icons side-nav-link-av">add_circle</i>
          create document
        </Link>
      </li>
      <li>
        <Link to={`${url}/mydocuments`} className="waves-effect side-nav-link">
          <i className="material-icons side-nav-link-av">folder</i>
        my documents
        </Link>
      </li>
      <li>
        <Link className="waves-effect side-nav-link" to={`${url}/generalDocuments?query=&offset=0&limit=10`}>
          <i className="material-icons side-nav-link-av">public</i>
          General Documents
        </Link>
      </li>
      <li>
        <Link className="waves-effect side-nav-link" to={`${url}/editprofile`}>
          <i className="material-icons side-nav-link-av">mode_edit</i>
          Edit Profile
        </Link>
      </li>
      {user.roleId === 1 &&
      <li>
        <Link
          className="waves-effect side-nav-link"
          to={`${url}/users?q=&offset=0&limit=10`}
        >
          <i className="material-icons side-nav-link-av">people</i>
          Manage users
        </Link>
      </li>
      }
      <li>
        <a
          className="waves-effect side-nav-link"
          onClick={(e) => { e.preventDefault(); logout(); }}
        >
          <i className="material-icons side-nav-link-av">exit_to_app</i>
          Log out
        </a>
      </li>
    </ul>
    <a
      data-activates="slide-out"
      className="button-collapse waves-effect waves-light"
    >
      <i className="material-icons">dashboard</i>
    </a>
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

