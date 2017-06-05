import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import signUp from '../actions/signUpAction';

/**
 * @desc signUp Component
 * @class SignUp
 * @extends {Component}
 */
class SignUp extends Component {
  /**
   * Creates an instance of SignUp.
   * @param {any} props property of Component
   * @memberof SignUp
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: ''

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
/**
 * @desc handles change of form input
 * @param {any} event html event
 * @memberof SignUp
 * @returns {null} no return value
 *  */
  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  /**
   * @desc handles form submission
   * @param {any} event html event
   * @returns {*} html
   * @memberof SignUp
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.signUp(this.state);
  }
  /**
   * @desc renders html
   * @returns {*} html
   * @memberof SignUp
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
            <div className="input-field col s6">
              <input
                placeholder="Placeholder"
                id="first_name"
                type="text"
                className="validate"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input
                id="last_name"
                type="text"
                className="validate"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <label htmlFor="last_name">Last Name</label>
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ signUp }, dispatch);
const mapStateToProps = state => ({
  status: state.signUpReducer
});
SignUp.defaultProps = {
  status: false,
  signUp: () => undefined
};
SignUp.propTypes = {
  status: PropTypes.func,
  signUp: PropTypes.function,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
