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
    this.handleChange = this.handleChange.bind(this);
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
      limit: 12,
      offset: parsed.page ? (parsed.page - 1) * 12 : 0,
      access: parsed.access ? parsed.access : ''
    };
    this.props.getUserDocuments(payload).then(() => {
      this.setState({
        access: parsed.access ? parsed.access : '',
        documents: this.props.documents,
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
    const parsed = queryString.parse(nextProps.location.search);
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({ query: parsed.query ? parsed.query : '' });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: 12,
        offset: parsed.page ? (parsed.page - 1) * 12 : 0,
        access: parsed.access ? parsed.access : ''
      };
      this.props.getUserDocuments(payload);
    } else {
      this.setState({
        access: parsed.access ? parsed.access : '',
        documents: nextProps.documents
      });
    }
  }
  /**
   * @param {any} event  html event
   * @desc handles onChange of filter
   * @returns {*} no return value
   * @memberof GeneralDocuments
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ access: event.target.value });
    this.props.history.replace(`${this.props.location.pathname}?query=&page=${1}&access=${event.target.value}`);
  }
  /**
   * @desc handles paginate click
   * @param {any} data page clicked
   * @returns {null} no return value
   * @memberof UserDocuments
   */
  handlePageClick(data) {
    const selected = data.selected;
    const page = selected + 1;
    this.props.history.replace(`${this.props.location.pathname}?query=${this.state.query}&page=${page}&access=${this.state.access}`);
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
      title: `Are you sure you want to delete this document with title ${title}?`,
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
    this.props.deleteDocument(id).then(() => {
      const parsed = queryString.parse(this.props.location.search);
      this.setState({ query: parsed.query ? parsed.query : '' });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: 12,
        offset: parsed.page ? (parsed.page - 1) * 12 : 0,
        access: this.state.access
      };
      this.props.getUserDocuments(payload);
    });
  } else {
    swal('Cancelled', 'Your document is safe :)', 'error');
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
        <div className="row">
          <div className="col s12 m4">
            <div className="row">
              <div className="col s12">
                <select
                  className="browser-default"
                  id="Select"
                  name="access"
                  value={`${this.state.access}`}
                  onChange={this.handleChange}
                >
                  <option value="">All Documents</option>
                  <option value="public">Public Documents</option>
                  <option value="private">private Documents</option>
                  <option value="role">Role Documents</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col s12 m8">
            <SearchBar
              url={this.props.location.pathname}
              query={this.state.query}
              access={this.state.access}
            />
          </div>
        </div>

        { this.state.documents &&
        <div>
          { this.props.loading &&
          <div className="progress">
            <div className="indeterminate" />
          </div>
        }
          {
          this.state.documents.length === 0 && !this.props.loading &&
          <div className="center-align">
            <h4>No documents found</h4>
          </div>
        }
          { this.state.documents.length >= 1 &&
          <div>
            <div className="row" >
              {documents}
            </div>
          </div>
        }
          { this.state.showPaginate &&
          <div className="center-align">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              forcePage={this.props.metaData.page - 1}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={this.props.metaData.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
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
  metaData: state.documentReducer.userDocumentsMetaData,
  userId: state.authReducer.userId,
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
