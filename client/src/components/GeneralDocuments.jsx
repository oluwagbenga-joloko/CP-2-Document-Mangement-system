import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import swal from 'sweetalert';
import {
  deleteDocument,
  searchDocuments
} from '../actions/DocumentActions';
import DocumentCard from './DocumentCard.jsx';
import SearchBar from './SearchBar.jsx';

/**
 * @desc GeneralDocument component
 * @class GeneralDocument
 * @extends {Component}
 */
class GeneralDocuments extends Component {
  /**
   * Creates an instance of GeneralDocument.
   * @param {any} props property of element
   * @memberof GeneralDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
      query: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof GeneralDocument
   * @returns {*} has no return value;
   */
  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search);
    if (parsed.query) {
      this.setState({ query: parsed.query });
      this.props.searchDocuments(parsed.query).then(() => {
        this.setState({ documents: this.props.documents });
      });
    } else {
      this.setState({ query: parsed.query });
      this.props.searchDocuments(this.state.query).then(() => {
        this.setState({ documents: this.props.documents });
      });
    }
  }
  /**
   * @desc runs when compoent recieves new props;
   * @param {any} nextProps next property of element
   * @memberof GeneralDocument
   *  @returns {*} has no return value;
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      const parsed = queryString.parse(nextProps.location.search);
      if (parsed.query) {
        this.props.searchDocuments(parsed.query);
      } else {
        this.props.searchDocuments('');
      }
    } else {
      this.setState({ documents: nextProps.documents });
    }
  }
  /**
   * @desc hanldes delete of document
   * @param {string} title title of element to be deleted
   * @param {number} id id of element to be deleted
   * @returns {*} has no return value;
   * @memberof GeneralDocument
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
      this.props.searchDocuments(this.state.query);
    });
  } else {
    swal('Cancelled', 'Your imaginary file is safe :)', 'error');
  }
});
  }
  /**
   * @desc renders html
   * @returns {*} html
   * @memberof GeneralDocument
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
        <h1>general documents</h1>
        <SearchBar
          url={this.props.location.pathname}
          query={this.state.query}
        />
        <div className="row">
          {documents}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  deleteDocument,
  searchDocuments
}, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.Documents,
  userId: state.authReducer.user.id
});
GeneralDocuments.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string
  }).isRequired,
  searchDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(GeneralDocuments);
