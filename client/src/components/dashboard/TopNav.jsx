import React from 'react';
/**
 * @desc Top Navigation component
 * @returns {*} html
 */
const TopNav = () => (
  <header>
    <nav>
      <div className="nav-wrapper">
        <a className="brand-logo">
          <span id="logo1">Document</span>
          <span id="logo2">IT</span>
        </a>
        <a
          role="button"
          data-activates="slide-out"
          className="button-collapse"
        ><i className="material-icons">menu</i></a>
      </div>
    </nav>
  </header>
    );
export default TopNav;
