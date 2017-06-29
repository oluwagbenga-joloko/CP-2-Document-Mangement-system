import React, { Component } from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from './TopNav.jsx';
import Footer from './Footer.jsx';
import SideNav from './SideNav.jsx';
import UserDocuments from '../documents/UserDocuments.jsx';
import GeneralDocuments from '../documents/GeneralDocuments.jsx';
import CreateDocument from '../documents/CreateDocument.jsx';
import SingleDocument from '../documents/SingleDocument.jsx';
import EditProfile from '../users/EditProfile.jsx';
import { logout } from '../../actions/AuthAction';
import { getCurrentUser } from '../../actions/userActions';
import { createDocument, getMydocument } from '../../actions/DocumentActions';
import AllUsers from '../users/AllUsers.jsx';
/**
 * @desc DAshboard home
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
/**
 * @param {object} props property of component
 * @desc renders html
 * @returns {*} html
 * @memberof Dashboard
 */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    console.log(this.props.userId);
    this.props.getCurrentUser(this.props.userId);
  }
  /**
   * @desc renders html
   * @returns {*} html to be rendered
   * @memberof Dashboard
   */
  render() {
    console.log(this.props.user);
    if (!this.props.userId) {
      return (<Redirect
        push
        to={{
          pathname: '/login',
        }}
      />);
    } else if (!this.props.user) {
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
            render={props => (<CreateDocument
              {...props}
              create={this.props.createDocument}
            />)}
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
const mapStateToProps = state => ({
  userId: state.authReducer.userId,
  user: state.userReducer.currentUser
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  createDocument,
  getMydocument,
  getCurrentUser
}, dispatch);

Dashboard.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
  .isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.shape({
    user: PropTypes.shape,
    success: PropTypes.bool
  }).isRequired,
  createDocument: PropTypes.func.isRequired
};

export default
  connect(mapStateToProps, mapDispatchToProps)(Dashboard);

