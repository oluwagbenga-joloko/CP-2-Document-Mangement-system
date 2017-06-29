import React from 'react';
import PropTypes from 'prop-types';

const Footer = () => (
  <footer className="page-footer">
    <div className="footer-copyright">
      <div className="container">
        <p className="inline left"> © 2017 Andela</p>
        <p className=" inline right" >Fork me on <a href="https://github.com/andela-ojoloko/CP-2-Document-Mangement-system">GitHub</a></p>
      </div>
    </div>
  </footer>

    );


Footer.propTypes = {
  logout: PropTypes.func.isRequired
};
export default Footer;
