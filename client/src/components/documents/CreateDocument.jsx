import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import {
  getDocument,
  createDocument,
  updateDocument
  } from '../../actions/documentActions';

/**
 * @desc compeent used to creat update and view document
 * @class CreateDocument
 * @extends {Component}
 */
export class CreateDocument extends Component {
  /**
   * Creates an instance of CreateDocument.
   * @param {any} props property of component
   * @returns {*} no return value
   * @memberof CreateDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      access: '',
      edit: false,
      owner: false,
      showTinyMce: false,
      content: '',

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
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
    } else {
      this.setState({ edit: true, showTinyMce: true, owner: true });
    }
  }
  /**
   * @desc runs when component recieves props;
   * @param {any} nextProps next props of component;
   * @returns{*} no return value
   * @memberof CreateDocument
   */
  componentWillReceiveProps(nextProps) {
    const { document, user } = this.props;
    if (document !== nextProps.document) {
      const newdocument = nextProps.document;
      this.setState({ showTinyMce: true, ...newdocument });
      if (newdocument.userId === user.id) {
        this.setState({ owner: true });
      } else {
        this.setState({ owner: false });
      }
    }
  }
  /**
   * @desc handles change of form input
   * @param {any} event html event
   * @returns {*} no return value
   * @memberof CreateDocument
   */
  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  /**
   * @desc handles form submission
   * @param {any} event  html event
   * @returns {null} returns no value
   * @memberof Login
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.props.updateDocument({ ...this.state, id }).then(() => {
        this.props.history.push('/dashboard');
      });
    } else {
      this.props.createDocument(this.state).then(() => {
        this.props.history.push('/dashboard');
      });
    }
  }
 /**
  * @desc handles change of TinyMCE editor
  * @param {any} e html event
  * @returns {null} no return value
  * @memberof CreateDocument
  */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
   /**
   * @desc renders Html
   * @returns {*} html
   * @memberof Login
   */
  render() {
    return (
      <div >
        { this.state.showTinyMce &&
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s3 m1 title-div">
              <h4 className="create-title">Title</h4>
            </div>
            <div className="input-field col s9 m4">
              <input
                disabled={!this.state.owner}
                id="title"
                type="text"
                className="validate create-title-input"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="col s3 m1 title-div">
              <h4 className="access-title">Access</h4>
            </div>

            <div className="input-field col s8 m4 access-option">

              <select
                className="browser-default create-select"
                disabled={!this.state.owner}
                id="Select"
                name="access"
                value={`${this.state.access}`}
                onChange={this.handleChange}
              >
                <option value="" disabled>Choose your option</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="role">role</option>
              </select>
            </div>
          </div>
          <div className="row TinyMCE-container">
            <TinyMCE
              content={this.state.content}
              onChange={this.handleEditorChange}
            />
            <br />
          </div>
          { this.state.owner &&
            <button
              className={`btn waves-effect
              waves-light col s6 offset-s3 z-depth-4 save-btn`}
              type="submit"
            >Save<i className="material-icons left">save</i>
              </button>
          }
        </form>
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
  user: state.userReducer.currentUser
});
/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getDocument,
  createDocument,
  updateDocument
}, dispatch);

CreateDocument.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })
  .isRequired,
  document: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    access: PropTypes.string.isRequired
  })
  .isRequired,
  getDocument: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  })
  .isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
