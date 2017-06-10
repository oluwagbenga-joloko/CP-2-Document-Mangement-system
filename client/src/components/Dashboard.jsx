import React, { Component } from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from './TopNav.jsx';
import SideNav from './SideNav.jsx';
import DocumentView from './DocumentView.jsx';
import GeneralDocuments from './GeneralDocuments.jsx';
import CreateDocument from './CreateDocument.jsx';
import { logout } from '../actions/AuthAction';
import { createDocument, getMydocument } from '../actions/DocumentActions';
import UserView from './UserView.jsx';
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
  /**
   * @desc renders html
   * @returns {*} html to be rendered
   * @memberof Dashboard
   */
  render() {
    if (!this.props.loggedIn.success) {
      return (<Redirect
        push
        to={{
          pathname: '/login',
        }}
      />);
    }
    return (
      <div>
        <TopNav logout={this.props.logout} />
        <SideNav url={this.props.match.url} user={this.props.loggedIn.user} />
        <main>
          <Route
            path={`${this.props.match.url}/createdocument`}
            render={props => (<CreateDocument
              {...props}
              create={this.props.createDocument}
            />)}
          />
          <Route
            path={`${this.props.match.url}/mydocuments`}
            render={props => (<DocumentView
              {...props}
              user={this.props.loggedIn.user}
            />)}
          />
          <Route
            path={`${this.props.match.url}/documents/:id`}
            component={CreateDocument}
          />
          <Route
            path={`${this.props.match.url}/users`}
            component={UserView}
          />
          <Route
            path={`${this.props.match.url}/generalDocuments`}
            render={props => (<GeneralDocuments
              {...props}
              user={this.props.loggedIn.user}
            />)}
          />
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  createDocument,
  getMydocument
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
  );
