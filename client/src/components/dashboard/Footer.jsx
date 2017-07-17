import React from 'react';

const url = 'https://github.com/andela-ojoloko/CP-2-Document-Mangement-system';
/**
 * @desc Footer
 * @returns {*} html
 */
const Footer = () => (
  <footer className="page-footer">
    <div className="footer-copyright">
      <div className="container">
        <p className="inline left"> © 2017 Andela</p>
        <p className=" inline right" >Fork me on
          <a href={url}>
          GitHub</a></p>
      </div>
    </div>
  </footer>
    );
export default Footer;
