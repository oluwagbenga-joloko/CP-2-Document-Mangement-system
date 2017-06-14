import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { getMydocuments, deleteDocument } from '../../actions/DocumentActions';
import DocumentCard from './DocumentCard.jsx';

/**
 * @desc Userdocuments component
 * @class UserDocuments
 * @extends {Component}
 */
class UserDocuments extends Component {
  /**
   * Creates an instance of UserDocuments.
   * @param {any} props property of element
   * @memberof UserDocuments
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof UserDocuments
   * @returns {*} has no return value;
   */
  componentWillMount() {
    this.props.getMydocuments(this.props.userId).then(() => {
      this.setState({ documents: this.props.documents });
    });
  }
  /**
   * @desc runs when compoent recieves new props;
   * @param {any} nextProps next property of element
   * @memberof UserDocuments
   *  @returns {*} has no return value;
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.documents.length !== nextProps.documents.length) {
      this.setState({ documents: nextProps.documents });
    }
  }
  /**
   * @desc hanldes delete of document
   * @param {string} title title of element to be deleted
   * @param {number} id id of element to be deleted
   * @returns {*} has no return value;
   * @memberof UserDocuments
   */
  handleDelete(title, id) {
    swal({
      title: `Are you sure you want to delete this document with ${title}?`,
      text: 'You will not be able to recover this document file!',
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
    swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
    this.props.deleteDocument(id).then(() => {
      this.props.getMydocuments(this.props.userId);
    });
  } else {
    swal('Cancelled', 'Your imaginary file is safe :)', 'error');
  }
});
  }
  /**
   * @desc renders html
   * @returns {*} html
   * @memberof UsereDocuments
   */
  render() {
    const documents = this.state.documents.map((document) => {
      const props = {
        title: document.title,
        content: document.content,
        access: document.access,
        id: document.id,
        deleteDocument: this.handleDelete
      };
      return <DocumentCard {...props} />;
    });
    return (

      <div>
        <h3 className=" header-dash">My Documents</h3>
        <div className="row" >
          {documents}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  getMydocuments,
  deleteDocument
}, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.Documents,
  userId: state.authReducer.user.id
});
UserDocuments.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  userId: PropTypes.number.isRequired,
  getMydocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);
