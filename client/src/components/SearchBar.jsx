import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @class SearchBar
 * @extends {Component}
 */
class SearchBar extends Component {
  /**
   * Creates an instance of SearchBar.
   * @param {any} props property of element
   * @memberof SearchBar
   */
  constructor(props) {
    super(props);
    this.state = {
      query: props.query
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * @desc handles submit of search form
   * @param {any} event html events
   * @returns {null} has no return value
   * @memberof SearchBar
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.history.replace(`${this.props.url}?query=${this.state.query}`);
  }
  /**
   * @desc handles change of form input
   * @param {any} event html event
   * @memberof SearchBar
   * @returns {null} no return value
   */
  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  /**
   * @desc renders Html
   * @returns {*} html
   * @memberof Login
   */
  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <div className="input-field inline">
          <input
            id="search"
            type="search"
            required
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons">close</i>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>);
  }
}
SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func
  }).isRequired,
  url: PropTypes.string.isRequired
};

export default withRouter(SearchBar);
