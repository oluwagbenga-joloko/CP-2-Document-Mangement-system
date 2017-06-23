import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import striptags from 'striptags';

const DocumentCard = ({
  title, content, access, id, deleteDocument,
  userId, ownerId, creator }) => (
    <div className="col s12 m4">
      <div className="card white">
        <div className="card-content doc-card">
          <span className="card-title doc-card-title">{title}</span>
          <p className="access">Access: {access}</p>
          <p className="access">Creator: {creator}</p>
          <div className="divider card-divider" />
          <p className="doc-card-content">{striptags(content)}</p>
        </div>
        <div className="card-action">
          { ((userId === ownerId)) &&
          <a
            className="waves-effect waves-light"
            role="button"
            tabIndex="-1"
            onClick={(e) => { e.preventDefault(); deleteDocument(title, id); }}
          >
            <i className="material-icons card-delete">delete</i>
          </a>
       }
          <a
            href={`/#/dashboard/viewdocuments/${id}`}
            className=" waves-effect waves-light"
          ><i className="material-icons card-view">visibilityt</i></a>
        </div>
      </div>
    </div>
);
DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  creator: PropTypes.string.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

export default DocumentCard;
