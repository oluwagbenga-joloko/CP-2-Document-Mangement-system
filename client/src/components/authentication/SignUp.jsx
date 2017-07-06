/* global $ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../actions/authActions';

/**
 * @desc signUp Component
 * @class SignUp
 * @extends {Component}
 */
export class SignUp extends Component {
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
      rePassword: '',
      email: '',
      errorMessage: '',
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
          nowhitespace: true
        },
        email: {
          nowhitespace: true,
          required: true,
          email: true
        },
        rePassword: {
          required: true,
          equalTo: '#password'
        }
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
        }
      },
      errorElement: 'div',
      errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: () => {
        this.props.signUp(this.state).then(() => {
          toastr.success('Account created successfully');
        }).catch(() => {
          this.setState({
            errorMessage: this.props.message,
            showError: true
          });
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
    if (this.props.userId) {
      return (<Redirect
        push
        to={{
          pathname: '/dashboard/generaldocuments'
        }}
      />);
    }
    return (
      <div className="row login">
        <div className="col s12 m6 div logo" >
          <h1 className="center-align">
            <span className="logo1">Document</span>
            <span className="logo2">It</span>
          </h1><h1 className="logintext center-align hide-on-small-only">
            Manage all your Documents in one Place
          </h1>
        </div>
        <div className="col s12 m6 signup_body">
          <div className="row">
            <div className="col s10  offset-s1">
              <div className="card form z-depth-4">
                {
                this.props.loading &&
                  <div className="progress">
                    <div className="indeterminate" />
                  </div>
               }
                <div className="card-content login-content">
                  <form
                    id="signupForm"
                    onSubmit={(e) => { e.preventDefault(); }}
                  >
                    <div className="row">
                      <div className="input-field col s12 m6 ">
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
                      <div className="input-field col s12 m6">
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
                          {this.state.errorMessage}
                        </div>
                        }
                        <label htmlFor="email" className="active">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 m6 ">
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
                      <div className="input-field col s12 m6">
                        <i className="material-icons prefix">lock_outline</i>
                        <input
                          id="rePassword"
                          type="password"
                          name="rePassword"
                          value={this.state.rePassword}
                          onChange={this.handleChange}
                        />
                        <label
                          htmlFor="rePassword"
                          className="active"
                        >Confirm Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <button
                        disabled={this.props.loading}
                        className={`btn waves-effect waves-light 
                        col s6 offset-s3 z-depth-4 loginbtn`}
                        type="submit"
                      >Sign Up
              </button>
                    </div>

                  </form>
                  <div className="divider" />
                  <p className="center-align">Have an account ?
                     <a className="center-align" href="/#/login"> login</a>
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
/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ signUp }, dispatch);
/**
 * @desc maps state to props;
 * @param {*} state sore state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  userId: state.authReducer.userId,
  message: state.authReducer.message,
  loading: state.ajaxCallReducer.loading
});
SignUp.defaultProps = {
  loading: false,
  message: undefined,
  userId: undefined
};
SignUp.propTypes = {
  userId: PropTypes.number,
  loading: PropTypes.bool,
  message: PropTypes.string,
  signUp: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
