import React from 'react';
import PropTypes from 'prop-types';

const TopNav = ({ logout }) => (
  <header>
    <nav>
      <div className="nav-wrapper">
        <a href="" className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <a
            data-activates="slide-out"
            className="button-collapse waves-effect waves-light"
          >
            <i className="material-icons">dashboard</i>
          </a>
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li>
            <a
              href=""
              role="button"
              tabIndex="0"
              onClick={(e) => { e.preventDefault(); logout(); }}
            >
              logout
            </a></li>
        </ul>
      </div>
    </nav>
  </header>
    );

TopNav.propTypes = {
  logout: PropTypes.func.isRequired
};
export default TopNav;
