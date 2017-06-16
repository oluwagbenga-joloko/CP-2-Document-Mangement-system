import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import {
  getUserDocuments,
  deleteDocument
} from '../../actions/DocumentActions';
import SearchBar from '../dashboard/SearchBar.jsx';
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
      query: '',
      limit: 12,
      pageCount: null,
      initialPage: 0,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   * @desc runs before component mounts
   * @memberof UserDocuments
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
    this.props.getUserDocuments(payload).then(() => {
      this.setState({
        documents: this.props.documents,
        pageCount: Math.ceil(this.props.count / 12),
        initialPage: Math.ceil(payload.offset / 12),
        showPaginate: true,
      });
    });
  }
  /**
   * @desc runs when compoent recieves new props;
   * @param {any} nextProps next property of element
   * @memberof UserDocuments
   *  @returns {*} has no return value;
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      const parsed = queryString.parse(nextProps.location.search);
      this.setState({ query: parsed.query ? parsed.query : '' });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: parsed.limit ? parsed.limit : 12,
        offset: parsed.offset ? parsed.offset : 0,
      };
      this.props.getUserDocuments(payload);
    } else {
      this.setState({
        documents: nextProps.documents,
        pageCount: Math.ceil(nextProps.count / 12) });
    }
  }
  /**
   * @desc handles paginate click
   * @param {any} data page clicked
   * @returns {null} no return value
   * @memberof UserDocuments
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.props.history.replace(`${this.props.location.pathname}?query=${this.state.query}&limit=${12}&offset=${offset}`);
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
      const parsed = queryString.parse(this.props.location.search);
      this.setState({ query: parsed.query ? parsed.query : '' });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: parsed.limit ? parsed.limit : 12,
        offset: parsed.offset ? parsed.offset : 12,
      };
      this.props.getUserDocuments(payload);
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
    let documents;
    if (this.state.documents) {
      documents = this.props.documents.map((document) => {
        const props = {
          title: document.title,
          content: document.content,
          access: document.access,
          id: document.id,
          creator: `${document.User.firstName} ${document.User.lastName}`,
          deleteDocument: this.handleDelete
        };
        return <DocumentCard {...props} />;
      });
    } else {
      documents = null;
    }

    return (
      <div>
        <h3 className=" header-dash">My Documents</h3>
        <SearchBar
          url={this.props.location.pathname}
          query={this.state.query}
        />
        { this.state.documents &&
        <div>
          { this.props.loading &&
          <div className="progress">
            <div className="indeterminate" />
          </div>
        }
          {
          this.state.documents.length === 0 && !this.props.loading &&
          <h3>No documents found</h3>
        }
          { this.state.documents.length >= 1 &&
          <div>
            <div className="row" >
              {documents}
            </div>
          </div>
        }
          { this.state.showPaginate &&
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
        }
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserDocuments,
  deleteDocument
}, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.userDocuments,
  count: state.documentReducer.userDocumentsCount,
  userId: state.authReducer.user.id,
  loading: state.ajaxCallReducer.loading,
});
UserDocuments.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  getUserDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired

};
export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);
