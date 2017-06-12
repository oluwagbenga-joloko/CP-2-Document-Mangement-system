/* global $ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { login } from '../actions/AuthAction';


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
      email: '',
      errorMsg: 'ddfdfdfdfdfdfdfdfdfdfdf',
      showError: false

    };
    this.handleChange = this.handleChange.bind(this);
  }
   /**
   * @desc runs before component recieves props;
   * @param {any} nextProps property of element;
   * @return {null} no return value;
   * @memberof SignUp
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.status.success) {
      this.setState({
        errorMsg: nextProps.status.msg,
        showError: true
      });
    }
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
    this.setState({ [name]: value, showError: false });
    const that = this;
    $('#loginForm').validate({
      rules: {
        password: {
          required: true,
          nowhitespace: true,
        },
        email: {
          nowhitespace: true,
          required: true,
          email: true
        },
      },
      messages: {
        email: {
          required: 'Please enter a your email',
          email: 'please enter a valid email'
        },
        password: {
          required: 'Please provide a password',
        },
      },
      errorElement: 'div',
      errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler() {
        that.props.login(that.state).then(() => {
          toastr.success('Login successfully');
        });
      }
    });
  }
  /**
   * @desc handles form submission
   * @param {any} event  html event
   * @returns {null} returns no value
   * @memberof Login
   */
  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.login(this.state);
  // }
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
      <div className="row login">
        <div className="col s12 m6 div logo" >
          <h1 className="center-align">
            <span className="logo1">Document</span>
            <span className="logo2">It</span>
          </h1>
          <h1 className="logintext center-align ">
            Manage all your Documents in one Place
          </h1>
        </div>
        <div className="col s12 m6 login_body">
          <div className="row">
            <div className="col s10  offset-s1">
              <div className="card form z-depth-4">
                <div className="card-content login-content">
                  <form id="loginForm">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
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
                        <i className="material-icons prefix">lock_outline</i>
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
                    {this.state.showError &&
                    <div className="custom-error-login center-align header-dash">{this.state.errorMsg}</div>
                    }
                    <div className="row">
                      <button
                        className="btn waves-effect waves-light col s6 offset-s3 z-depth-4 loginbtn"
                        type="submit"
                      >Login
              </button>
                    </div>

                  </form>
                  <div className="divider" />
                  <p className="center-align">Don`t have an account ?
                    <Link className="center-align" to="/signup">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);
const mapStateToProps = state => ({
  status: state.authReducer
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
