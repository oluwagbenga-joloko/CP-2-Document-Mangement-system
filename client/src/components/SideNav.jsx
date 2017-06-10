import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideNav = ({ user, url }) => (
  <div>
    <ul id="slide-out" className="side-nav fixed">
      <li>
        <div className="userView">
          <div className="background">
            <img src="images/office.jpg" alt="images" />
          </div>
          <a href="#!user">
            <img className="circle" alt="images" src="images/yuna.jpg" />
          </a>
          <a href="#!name"><span className="white-text name" /></a>
          <a href="#!email">
            <span className="white-text email">{user.email}</span>
          </a>
        </div></li>
      <li>
        <a href="#!">
          <i className="material-icons">cloud</i>First Link With Icon
        </a>
      </li>
      <li><a href="#!" >home</a></li>
      <li><div className="divider" /></li>
      <li><a href={`${url}/creatdocument`} className="subheader">header</a></li>
      <li>
        <Link to={`${url}/createdocument`} className="waves-effect">
          create document
        </Link>
      </li>
      <li>
        <Link to={`${url}/mydocuments`} className="waves-effect">
        my document
        </Link>
      </li>
      <li>
        <Link className="waves-effect" to={`${url}/generalDocuments`}>
          General Documents
        </Link>
      </li>
      {user.roleId === 1 &&
      <li>
        <Link className="waves-effect" to={`${url}/users`}>
          Manage users
        </Link>
      </li>
      }
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
};
export default SideNav;

