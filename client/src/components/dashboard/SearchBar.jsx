import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @class SearchBar
 * @extends {Component}
 */
export class SearchBar extends Component {
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
    const queryUrl =
     `query=${this.state.query}&access=${this.props.access}`;
    this.props.history.replace(`${this.props.url}?${queryUrl}`);
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
        <div className="row z-depth-2">
          <div className="col s10">
            <input
              placeholder="Search"
              id="search"
              type="search"
              name="query"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
          <div className="col s2 right-align">
            <button
              className={`btn waves-effect waves-light
                     left-align z-depth-0 search-btn`}
              type="submit"
            >
              <i className="material-icons search-icon">search</i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
SearchBar.defaultProps = {
  access: ''
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func
  }).isRequired,
  url: PropTypes.string.isRequired,
  access: PropTypes.string
};

export default withRouter(SearchBar);
