import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getDocument,
} from '../../actions/documentActions';

/**
 * @desc compeent used to creat update and view document
 * @class SingleDocument
 * @extends {Component}
 */
export class SingleDocument extends Component {
  /**
   * Creates an instance of SingleDocument.
   * @param {any} props property of component
   * @returns {*} no return value
   * @memberof SingleDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      access: '',
      content: '',
      owner: false,
      createdAt: ''

    };
  }
  /**
   * @desc handles change of form input
   * @param {any} event  html event
   * @returns {null} returns no value
   * @memberof Login
   */
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.getDocument(id).then(() => {
      const { document, user } = this.props;
      this.setState({ ...document, showDocument: true });
      if (document.userId === user.id) {
        this.setState({ owner: true });
      }
    });
  }
  /**
   * @desc renders Html
   * @returns {*} html
   * @memberof Login
   */
  render() {
    return (
      <div>
        { !this.state.showDocument &&
        <div className="preloader-wrapper active big single-doc-loader">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle center-align" />
            </div><div className="gap-patch">
              <div className="circle" />
            </div><div className="circle-clipper">
              <div className="circle" />
            </div>
          </div>
        </div>
      }
        { this.state.showDocument &&
        <div>
          <div className="row single-doc-row">
            <div className="col s8 m8 single-doc-title">
              <h4 className="doc-title">{this.state.title}</h4>
            </div>
            <div className="col s8 m4 single-doc-edit">
              { this.state.owner &&
              <Link
                id="edit-document"
                className={`btn waves-effect
              waves-light col m6 offset-m3 offset-s0 z-depth-4 save-btn`}
                to={`/dashboard/editdocuments/${this.props.match.params.id}`}
              >
                <i className="material-icons left">mode_edit</i>
        Edit
        </Link>
        }
            </div>
          </div>
          <div className="divider" />
          <p className="single-doc-access">
            <span className="doc-sub-header">Access: </span>
            <span>{this.state.access}</span>
          </p>

          <p className="single-doc-published">
            <span className="doc-sub-header" >Published: </span>
            <span>{this.state.createdAt.slice(0, 10)}</span>
          </p>
          <div className="divider" />
          <div
            className="innerhtml margin-5px"
          />
          {renderHTML(this.state.content)}
        </div>
   }
      </div>
    );
  }
}
/**
 * @desc maps state to props;
 * @param {*} state sore state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  document: state.documentReducer.document,
  user: state.userReducer.currentUser,
});
/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getDocument,
}, dispatch);

SingleDocument.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  document: PropTypes.shape({}).isRequired,
  getDocument: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleDocument));

