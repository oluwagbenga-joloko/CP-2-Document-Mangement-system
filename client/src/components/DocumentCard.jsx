import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DocumentCard = ({ title, content, access, id, deleteDocument }) => (
  <div className="col s3 m3">
    <div className="card blue-grey">
      <div className="card-content yellow-text">
        <span className="card-title">{title}</span>
        <p>{content}</p>
        <p>aceess: {access}</p>
      </div>
      <div className="card-action">
        <a
          className=" waves-effect waves-light"
          role="button"
          tabIndex="-1"
          onClick={(e) => { e.preventDefault(); deleteDocument(title, id); }}
        >
          <i className="material-icons">delete</i>
        </a>
        <a className=" waves-effect waves-light">
          <i className="material-icons">pageview</i>
        </a>
        <Link
          to={`documents/${id}`}
          className=" waves-effect waves-light"
        ><i className="material-icons">mode_edit</i></Link>
      </div>
    </div>
  </div>
);
DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

export default DocumentCard;
