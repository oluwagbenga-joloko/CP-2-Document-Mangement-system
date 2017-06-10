import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getDocument,
  createDocument,
  updateDocument
  } from '../actions/DocumentActions';

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
      content: '',
      access: '',
      edit: false,
      owner: false,

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
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
      this.setState({ edit: true });
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
      this.setState({ ...newdocument });
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
   * @desc renders Html
   * @returns {*} html
   * @memberof Login
   */
  render() {
    return (
      <div className="row">
        <form className="col s10" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                disabled={!this.state.edit}
                id="title"
                type="text"
                className="validate"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <label htmlFor="title">tiitle</label>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  disabled={!this.state.edit}
                  name="content"
                  id="textarea1"
                  className="materialize-textarea"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
                <label htmlFor="textarea1">content</label>
              </div>
            </div>
            <div className="input-field col s12">
              <select
                disabled={!this.state.edit}
                className="browser-default"
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
              <label htmlFor="Select"className="active" >access</label>
            </div>
          </div>
          { !this.state.edit && this.state.owner &&
            <div
              className="waves-effect waves-light btn"
              onClick={this.handleEditClick}
            >
              <i className="material-icons left">mode_edit</i>Edit
            </div>
          }
          { this.state.edit &&
            <div className="waves-effect waves-light btn">
              <i
                className="material-icons left"
              >save
             </i>
              <input type="submit" value="Save" />
            </div>
          }
        </form>
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
