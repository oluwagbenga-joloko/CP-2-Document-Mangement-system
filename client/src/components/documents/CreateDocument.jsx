import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import {
  getDocument,
  createDocument,
  updateDocument
  } from '../../actions/DocumentActions';

const STYLES = {
  container: {
    fontFamily: 'Helvetica Neue, sans-serif',
    padding: '0 25px'
  },
  output: {
    border: '1px solid #999',
    borderRadius: 5,
    fontFamily: 'Courier New, monospace',
    padding: 10,
    height: 250,
    overflow: 'auto'
  }
};

/**
 * @desc compeent used to creat update and view document
 * @class CreateDocument
 * @extends {Component}
 */
class CreateDocument extends Component {
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

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
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
    console.log(name, value);
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
      this.props.updateDocument({ ...this.state, id });
    } else {
      this.props.createDocument(this.state);
    }
  }
  /**
   * @desc handles edit click
   * @param {any} event hmtl event
   * @memberof CreateDocument
   * @returns {null} no return value
   */
  handleEditClick(event) {
    event.preventDefault();
    this.setState({ edit: true });
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
    console.log('this.state.content', this.state.content);
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
                className="validate"
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
                className="browser-default"
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
          <div style={STYLES.container} className="row">
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
const mapStateToProps = state => ({
  document: state.documentReducer.document,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getDocument,
  createDocument,
  updateDocument
}, dispatch);

CreateDocument.propTypes = {
  user: PropTypes.shape.isRequired,
  document: PropTypes.shape.isRequired,
  getDocument: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  match: PropTypes.shape.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
