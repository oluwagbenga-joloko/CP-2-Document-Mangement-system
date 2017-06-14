import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import {
  deleteDocument,
  searchDocuments
} from '../../actions/DocumentActions';
import DocumentCard from './DocumentCard.jsx';
import SearchBar from '../dashboard/SearchBar.jsx';
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
      query: '',
      limit: 10,
      pageCount: null,
      initialPage: 0,
      showPaginate: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof GeneralDocument
   * @returns {*} has no return value;
   */
  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.setState({ query: parsed.query ? parsed.query : '' });
    const payload = {
      query: parsed.query ? parsed.query : '',
      limit: parsed.limit ? parsed.limit : 10,
      offset: parsed.offset ? parsed.offset : 0,
    };
    this.props.searchDocuments(payload).then(() => {
      this.setState({
        documents: this.props.documents,
        pageCount: Math.ceil(this.props.count / 10),
        showPaginate: true,
        initialPage: Math.ceil(parsed.offset / 10)
      });
    });
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
      this.setState({ query: parsed.query ? parsed.query : '' });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: parsed.limit,
        offset: parsed.offset,
      };
      this.props.searchDocuments(payload);
    } else {
      this.setState({
        documents: nextProps.documents,
        pageCount: Math.ceil(nextProps.count / 10)
      });
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
      const parsed = queryString.parse(this.props.location.search);
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: parsed.limit,
        offset: parsed.offset,
      };
      this.props.searchDocuments(payload);
    });
  } else {
    swal('Cancelled', 'Your imaginary file is safe :)', 'error');
  }
});
  }
  /**
   * @desc hanldes pagination
   * @param {any} data button clicked
   * @returns {null} no return value
   * @memberof GeneralDocuments
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.props.history.replace(`${this.props.location.pathname}?query=${this.state.query}&limit=${10}&offset=${offset}`);
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
        deleteDocument: this.handleDelete,
        userId: this.props.userId,
        ownerId: document.userId,
        roleId: this.props.roleId,

      };
      return <DocumentCard {...props} />;
    });
    return (
      <div>
        <h3 className=" header-dash">General Documents</h3>
        <SearchBar
          url={this.props.location.pathname}
          query={this.state.query}
        />
        <div className="row">
          {documents}
        </div>
        {this.state.showPaginate &&
        <ReactPaginate
          initialPage={this.state.initialPage}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        }
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
  count: state.documentReducer.count,
  userId: state.authReducer.user.id,
  roleId: state.authReducer.user.roleId,
});
GeneralDocuments.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string
  }).isRequired,
  searchDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  roleId: PropTypes.number.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(GeneralDocuments);
