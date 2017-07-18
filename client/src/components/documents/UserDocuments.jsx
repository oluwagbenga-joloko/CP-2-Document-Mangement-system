import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import {
  getUserDocuments,
  deleteDocument
} from '../../actions/documentActions';
import SearchBar from '../dashboard/SearchBar';
import DocumentCard from './DocumentCard';

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
      access: '',
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
      this.setState({ query: parsed.query ? parsed.query : '',
        access: parsed.access ? parsed.access : ''
      });
      const payload = {
        query: parsed.query ? parsed.query : '',
        limit: 12,
        offset: parsed.page ? (parsed.page - 1) * 12 : 0,
        access: parsed.access ? parsed.access : ''
      };
      this.props.getUserDocuments(payload);
    } else {
      this.setState({
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
    const queryUrl =
    `query=&page=${1}&access=${event.target.value}`;
    this.props.history.replace(`${this.props.location.pathname}?${queryUrl}`);
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
    const queryUrl =
    `query=${this.state.query}&page=${page}&access=${this.state.access}`;
    this.props.history.replace(`${this.props.location.pathname}?${queryUrl}`);
  }
  /**
   * @desc hanldes delete of document
   * @param {number} id id of element to be deleted
   * @returns {*} has no return value;
   * @memberof UserDocuments
   */
  handleDelete(id) {
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
          deleteDocument: this.handleDelete,
          userId: this.props.userId,
          ownerId: document.userId,
        };
        return <DocumentCard key={document.id} {...props} />;
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
            <h4 className="no-documents">No documents found</h4>
          </div>
        }
          { this.state.documents.length >= 1 &&
          <div className="document-list">
            <div className="row" >
              {documents}
            </div>
          </div>
        }
          { this.state.showPaginate && this.state.documents.length > 0 &&
          <div className="center-align">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              forcePage={this.props.pagination.page - 1}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={this.props.pagination.pageCount}
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
/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserDocuments,
  deleteDocument
}, dispatch);
/**
 * @desc maps state to props;
 * @param {*} state sore state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  documents: state.documentReducer.userDocuments,
  pagination: state.documentReducer.userDocumentspagination,
  userId: state.authReducer.userId,
  loading: state.ajaxCallReducer.loading,
});
UserDocuments.propTypes = {
  userId: PropTypes.number.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  getUserDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired })
    .isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string
  })
  .isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
  .isRequired

};
export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);
export { UserDocuments };
