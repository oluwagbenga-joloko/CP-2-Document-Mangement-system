import React, { Component } from 'react';
import PropTypes from 'prop-types';
import striptags from 'striptags';
import swal from 'sweetalert';

/**
 * @class DocumentCard
 * @extends {Component}
 */
class DocumentCard extends Component {
  /**
   * Creates an instance of DocumentCard.
   * @memberof DocumentCard
   */
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  /**
   * @desc deletes document
   * @param {any} title title of document
   * @param {any} id id of document
   * @memberof DocumentCard
   * @returns {null} no return value
   */
  handleDelete(title, id) {
    swal({
      title: `Are you sure you want to
       delete this document with title ${title}?`,
      text: 'You will not be able to recover this document again!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel plx!',
      closeOnConfirm: true,
      closeOnCancel: false
    },
(isConfirm) => {
  if (isConfirm) {
    swal('Deleted!', 'Your document has been deleted.', 'success');
    this.props.deleteDocument(id);
  } else {
    swal('Cancelled', 'Your document is safe :)', 'error');
  }
});
  }
  /**
   * @desc renders html
   * @returns {*} return html
   * @memberof DocumentCard
   */
  render() {
    const { title, content, access, id,
  userId, ownerId, creator } = this.props;
    return (
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
            { userId === ownerId &&
            <a
              className="waves-effect waves-light delete-document"
              role="button"
              tabIndex="-1"
              onClick={(e) => {
                e.preventDefault();
                this.handleDelete(title, id);
              }}
            >
              <i className="material-icons card-delete">delete</i>
            </a>
       }
            <a
              href={`/#/dashboard/viewdocuments/${id}`}
              className=" waves-effect waves-light view-document"
            ><i className="material-icons card-view">visibilityt</i></a>
          </div>
        </div>
      </div>
    );
  }
}
DocumentCard.defaultProps = {
  roleId: undefined
};
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
