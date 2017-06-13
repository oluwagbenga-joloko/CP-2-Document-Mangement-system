/* global $ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../actions/AuthAction';
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
      email: '',
      errorMsg: '',
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
 * @param {any} event html event
 * @memberof SignUp
 * @returns {null} no return value
 *  */
  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'email') {
      this.setState({ showError: false });
    }
    this.setState({ [name]: value });
    const that = this;
    $('#signupForm').validate({
      rules: {
        firstName: {
          required: true,
          nowhitespace: true,
          minlength: 2
        },
        lastName: {
          required: true,
          nowhitespace: true,
          minlength: 2
        },
        password: {
          required: true,
          minlength: 5,
          nowhitespace: true,
        },
        email: {
          nowhitespace: true,
          required: true,
          email: true
        },
      },
      messages: {
        firstName: {
          required: 'Please enter a your firstname',
          minlength: 'Your first Name must consist of at least 2 characters'
        },
        lastName: {
          required: 'Please enter a your lastname',
          minlength: 'Your last Name must consist of at least 2 characters'
        },
        email: {
          required: 'Please enter a your email',
          email: 'please enter a valid email'
        },
        password: {
          required: 'Please provide a password',
          minlength: 'Your password must be at least 5 characters long'
        },
      },
      errorElement: 'div',
      errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler() {
        that.props.signUp(that.state).then(() => {
          toastr.success('Account created successfully');
        });
      }
    });
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
        <div className="col s12 m6 signup_body">
          <div className="row">
            <div className="col s10  offset-s1">
              <div className="card form z-depth-4">
                <div className="card-content login-content">
                  <form
                    id="signupForm"
                    onSubmit={(e) => { e.preventDefault(); }}
                  >
                    <div className="row">
                      <div className="input-field col s6">
                        <i className="material-icons prefix">account_box</i>
                        <input
                          id="first_name"
                          type="text"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                        <label
                          htmlFor="first_name"
                          className="active"
                        >First Name</label>
                      </div>
                      <div className="input-field col s6">
                        <i className="material-icons prefix">account_box</i>
                        <input
                          id="last_name"
                          type="text"
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                        <label
                          htmlFor="last_name"
                          className="active"
                        >Last Name</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                        { this.state.showError &&
                        <div className="custom-error">
                          {this.state.errorMsg}
                        </div>
                        }
                        <label htmlFor="email" className="active">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">lock_outline</i>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                        <label
                          htmlFor="password"
                          className="active"
                        >Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <button
                        className="btn waves-effect waves-light col s6 offset-s3 z-depth-4 loginbtn"
                        type="submit"

                      >Sign Up
              </button>
                    </div>

                  </form>
                  <div className="divider" />
                  <p className="center-align">Have an account ?
                    <Link className="center-align" to="/login"> login</Link>
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
const mapDispatchToProps = dispatch => bindActionCreators({ signUp }, dispatch);
const mapStateToProps = state => ({
  status: state.authReducer
});
SignUp.defaultProps = {
  status: false,
  signUp: () => undefined
};
SignUp.propTypes = {
  status: PropTypes.func,
  signUp: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
