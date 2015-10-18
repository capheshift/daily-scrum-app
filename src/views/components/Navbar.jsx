/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'Navbar.jsx';
var React = require('react');
var Link = React.createFactory(require('./Link'));
var UserStore = require('../../stores/UserStore');
var UserActions = require('../../actions/UserActions');

var Navbar = React.createClass({

  displayName: _name,

  getInitialState: function() {
    var fullName = window.localStorage.getItem('fullName');
    return {
      fullName: fullName || null
    };
  },

  componentDidMount: function() {
    UserStore.addListenerOnLoginSuccess(this._onLoginSuccess, this);
    UserStore.addListenerOnLoginFail(this._onLoginFail, this);
    UserStore.addListenerOnLogoutSuccess(this._onLogoutSuccess, this);
  },
  componentWillUnmount: function() {
    UserStore.rmvListenerOnLoginSuccess(this._onLoginSuccess);
    UserStore.rmvListenerOnLoginFail(this._onLoginFail);
    UserStore.rmvListenerOnLogoutSuccess(this._onLogoutSuccess);
  },

  _onLoginSuccess: function(body) {
    var fullName = body.data.fullName;
    this.setState({
      fullName: fullName
    });
  },

  _onLogoutSuccess: function(body) {
    window.location.hash = 'login';

    this.setState({
      fullName: ''
    });
  },

  _onLoginFail: function() {
  },

  logout: function() {
    console.log('logout');
    UserActions.logout({});
  },

  render: function() {
    var rightBlock = '';
    if (this.state.fullName) {
      rightBlock = (
        <li className={this._checkUri('todo')}>
          <a href="javascript:;" className="navbar-item" onClick={this.logout} >{this.state.fullName}</a>
        </li>
      );
    } else {
      rightBlock = (
        <li className={this._checkUri('todo')}>
          {Link({ className: 'navbar-item', to: '/login' }, 'LOGIN')}
        </li>
      );
    }

    return (
      <nav className="navbar">
        {Link({ className: 'navbar-brand', to: '/' }, 'DAILY SCRUM')}

        <ul className="nav navbar-nav">
          <li className={this._checkUri('')}>
            {Link({ className: 'navbar-item', to: '/daily' }, 'DAILY')}
          </li>
          <li className={this._checkUri('libraries')}>
            {Link({ className: 'navbar-item', to: '/report' }, 'REPORT')}
          </li>
          <li className={this._checkUri('todo')}>
            {Link({ className: 'navbar-item', to: '/project' }, 'PROJECT')}
          </li>
          <li className={this._checkUri('todo')}>
            {Link({ className: 'navbar-item', to: '/member' }, 'MEMBER')}
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          {rightBlock}
        </ul>
      </nav>
    );
  },

  /**
   * Internal Methods
   */
  _checkUri: function(uriCompare) {
    var _uri = this.props.uri[0];
    if (DEBUG) {
      console.log('[*] ' + _name + ':_checkUri ---');
      console.log(uriCompare);
      console.log(this.props.uri);
    }
    return (_uri === uriCompare) ? 'active': '';
  }

});

module.exports = Navbar;
