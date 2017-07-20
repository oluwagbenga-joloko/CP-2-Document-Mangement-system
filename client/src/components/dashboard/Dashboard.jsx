/* global $ */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from './TopNav';
import Footer from './Footer';
import SideNav from './SideNav';
import UserDocuments from '../documents/UserDocuments';
import GeneralDocuments from '../documents/GeneralDocuments';
import CreateDocument from '../documents/CreateDocument';
import SingleDocument from '../documents/SingleDocument';
import EditProfile from '../users/EditProfile';
import AllUsers from '../users/AllUsers';
import { logout } from '../../actions/authActions';
import { getCurrentUser } from '../../actions/userActions';

/**
 * @desc DAshboard home
 * @class Dashboard
 * @extends {Component}
 */
export class Dashboard extends Component {
/**
 * @desc runs before component mounts
 * @returns {null} no return value
 * @memberof Dashboard
 */
  componentWillMount() {
    this.props.getCurrentUser(this.props.userId).then(() => {
      $('.button-collapse').sideNav();
    });
  }
  /**
   * @desc renders html
   * @returns {*} html to be rendered
   * @memberof Dashboard
   */
  render() {
    if (!this.props.userId) {
      return (<Redirect
        push
        to={{
          pathname: '/login',
        }}
      />);
    }
    if (!this.props.user) {
      return null;
    }
    return (
      <div>
        <TopNav />
        <SideNav
          url={this.props.match.url}
          user={this.props.user}
          logout={this.props.logout}
        />
        <main>
          <Route
            path={`${this.props.match.url}/createdocument`}
            component={CreateDocument}
          />
          <Route
            exact
            path={`${this.props.match.url}/`}
            component={UserDocuments}
          />
          <Route
            path={`${this.props.match.url}/editdocuments/:id`}
            component={CreateDocument}
          />
          <Route
            path={`${this.props.match.url}/viewdocuments/:id`}
            component={SingleDocument}
          />

          <Route
            path={`${this.props.match.url}/users`}
            component={AllUsers}
          />
          <Route
            path={`${this.props.match.url}/generalDocuments`}
            component={GeneralDocuments}
          />
          <Route
            path={`${this.props.match.url}/editprofile`}
            component={EditProfile}
          />
        </main>
        <Footer />
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
  userId: state.authReducer.userId,
  user: state.userReducer.currentUser
});
/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  getCurrentUser
}, dispatch);

Dashboard.defaultProps = {
  user: undefined,
  userId: undefined
};

Dashboard.propTypes = {
  userId: PropTypes.number,
  match: PropTypes.shape({
    url: PropTypes.string
  })
  .isRequired,
  user: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

export default
  connect(mapStateToProps, mapDispatchToProps)(Dashboard);

