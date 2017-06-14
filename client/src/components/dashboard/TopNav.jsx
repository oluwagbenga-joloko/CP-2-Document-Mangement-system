import React from 'react';
import PropTypes from 'prop-types';

const TopNav = () => (
  <header>
    <nav>
      <div className="nav-wrapper">
        <a className="brand-logo">
          <span id="logo1">Document</span>
          <span id="logo2">IT</span></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <a
            data-activates="slide-out"
            className="button-collapse waves-effect waves-light"
          >
            <i className="material-icons">dashboard</i>
          </a>
        </ul>
      </div>
    </nav>
  </header>
    );

TopNav.propTypes = {
  logout: PropTypes.func.isRequired
};
export default TopNav;
