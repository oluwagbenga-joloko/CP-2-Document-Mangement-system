import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getDocument,
  } from '../../actions/DocumentActions';


/**
 * @desc compeent used to creat update and view document
 * @class SingleDocument
 * @extends {Component}
 */
class SingleDocument extends Component {
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
      showTinyMce: false,
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
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.props.getDocument(id);
    }
  }
  /**
   * @desc runs when component recieves props;
   * @param {any} nextProps next props of component;
   * @returns{*} no return value
   * @memberof SingleDocument
   */
  componentWillReceiveProps(nextProps) {
    const { document, user } = this.props;
    if (document !== nextProps.document) {
      const newdocument = nextProps.document;
      this.setState({ showTinyMce: true, ...newdocument });
      if (newdocument.userId === user.id) {
        this.setState({ owner: true });
      }
    }
  }
  /**
   * @desc renders Html
   * @returns {*} html
   * @memberof Login
   */
  render() {
    return (
      <div>
        <div className="row single-doc-row">
          <div className="col s8 m8 single-doc-title">
            <h4 className="doc-title">{this.state.title}</h4>
          </div>
          <div className="col s8 m4 single-doc-edit">
            { this.state.owner &&
            <Link
              className={`btn waves-effect
              waves-light col s6 offset-s3 z-depth-4 save-btn`}
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
          dangerouslySetInnerHTML={{ __html: this.state.content }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  document: state.documentReducer.document,
  user: state.userReducer.currentUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getDocument,
}, dispatch);

SingleDocument.propTypes = {
  user: PropTypes.shape.isRequired,
  document: PropTypes.shape.isRequired,
  getDocument: PropTypes.func.isRequired,
  match: PropTypes.shape.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleDocument));
