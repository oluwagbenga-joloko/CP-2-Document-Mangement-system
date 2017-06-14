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
      <div >
        <div className="row">
          <div className="col s12">
            <h5>Title: {this.state.title}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6">
            <h5>
              <span>Access: </span>
              <span>{this.state.access}</span>
            </h5>
          </div>
          <div className="col s12 m6">
            <h5>
              <span>Date published: </span>
              <span>{this.state.createdAt.slice(0, 10)}</span>
            </h5>
          </div>

        </div>
        <h5 className="margin-5px">Content</h5>
        <div className="innerhtml margin-5px" dangerouslySetInnerHTML={{ __html: this.state.content }} />
        { this.state.owner &&
        <Link className="btn waves-effect waves-light col s6 offset-s3 z-depth-4 save-btn" to={`/dashboard/editdocuments/${this.props.match.params.id}`}>
          <i className="material-icons side-nav-link-av">edit</i>
        Edit
        </Link>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  document: state.documentReducer.document,
  user: state.authReducer.user
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleDocument));
