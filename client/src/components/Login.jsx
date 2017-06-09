import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import login from '../actions/loginAction';

/**
 * @desc the login Component
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
    /**
     * Creates an instance of Login.
     * @param {any} props property of element
     * @memberof Login
     */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * @desc handles change of form input
   * @param {any} event  html event
   * @returns {null} returns no value
   * @memberof Login
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
    this.props.login(this.state);
  }
  /**
   * @desc renders Html
   * @returns {*} html
   * @memberof Login
   */
  render() {
    if (this.props.status.success) {
      return (<Redirect
        push
        to={{
          pathname: '/dashboard',
        }}
      />);
    }
    return (
      <div className="row">
        <form className="col s10" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);
const mapStateToProps = state => ({
  status: state.loginReducer
});
Login.defaultProps = {
  status: false,
  login: () => undefined
};
Login.propTypes = {
  status: PropTypes.bool,
  login: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
